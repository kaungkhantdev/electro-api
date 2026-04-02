import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './products.service';
import { PRODUCT_REPOSITORY } from './repositories/interfaces/product.repository.interface';
import { PRODUCT_IMAGE_REPOSITORY } from './repositories/interfaces/product-image.repository.interface';
import { PRODUCT_VARIANT_REPOSITORY } from './repositories/interfaces/product-variant.repository.interface';
import { PRODUCT_VARIANT_OPTION_REPOSITORY } from './repositories/interfaces/product-variant-option.repository.interface';

const mockProduct = {
  id: 'product-1',
  name: 'Test Product',
  description: 'A test product',
  price: 99.99,
  categoryId: 'cat-1',
  images: [],
  variants: [],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockVariant = {
  id: 'variant-1',
  productId: 'product-1',
  name: 'Size M',
  sku: 'SKU-M',
  price: 99.99,
  comparePrice: null,
  stock: 10,
  options: [],
};

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: {
    transaction: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findById: jest.Mock;
    findAll: jest.Mock;
  };
  let productImageRepository: {
    createMany: jest.Mock;
    deleteMany: jest.Mock;
  };
  let productVariantRepository: {
    create: jest.Mock;
    deleteMany: jest.Mock;
  };
  let productVariantOptionRepository: {
    createMany: jest.Mock;
  };

  beforeEach(async () => {
    productRepository = {
      transaction: jest.fn((fn) => fn()),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    productImageRepository = {
      createMany: jest.fn(),
      deleteMany: jest.fn(),
    };

    productVariantRepository = {
      create: jest.fn(),
      deleteMany: jest.fn(),
    };

    productVariantOptionRepository = {
      createMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PRODUCT_REPOSITORY, useValue: productRepository },
        { provide: PRODUCT_IMAGE_REPOSITORY, useValue: productImageRepository },
        {
          provide: PRODUCT_VARIANT_REPOSITORY,
          useValue: productVariantRepository,
        },
        {
          provide: PRODUCT_VARIANT_OPTION_REPOSITORY,
          useValue: productVariantOptionRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create product without images or variants', async () => {
      const dto = {
        name: 'Test Product',
        price: 99.99,
        categoryId: 'cat-1',
      } as any;
      productRepository.create.mockResolvedValue(mockProduct);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.createProduct(dto);

      expect(productRepository.transaction).toHaveBeenCalled();
      expect(productRepository.create).toHaveBeenCalledWith(dto);
      expect(productImageRepository.createMany).not.toHaveBeenCalled();
      expect(productVariantRepository.create).not.toHaveBeenCalled();
    });

    it('should create product images when images are provided', async () => {
      const dto = {
        name: 'Test Product',
        price: 99.99,
        images: [{ url: 'https://example.com/img.jpg', alt: 'img' }],
      } as any;
      productRepository.create.mockResolvedValue(mockProduct);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.createProduct(dto);

      expect(productImageRepository.createMany).toHaveBeenCalledWith([
        {
          productId: 'product-1',
          url: 'https://example.com/img.jpg',
          alt: 'img',
        },
      ]);
    });

    it('should create variants and their options when provided', async () => {
      const dto = {
        name: 'Test Product',
        price: 99.99,
        variants: [
          {
            name: 'Size M',
            sku: 'SKU-M',
            price: 99.99,
            comparePrice: null,
            stock: 10,
            options: [{ optionName: 'Size', optionValue: 'M' }],
          },
        ],
      } as any;
      productRepository.create.mockResolvedValue(mockProduct);
      productVariantRepository.create.mockResolvedValue(mockVariant);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.createProduct(dto);

      expect(productVariantRepository.create).toHaveBeenCalledWith({
        productId: 'product-1',
        name: 'Size M',
        sku: 'SKU-M',
        price: 99.99,
        comparePrice: null,
        stock: 10,
      });
      expect(productVariantOptionRepository.createMany).toHaveBeenCalledWith([
        { variantId: 'variant-1', optionName: 'Size', optionValue: 'M' },
      ]);
    });

    it('should re-fetch product with includes after creation', async () => {
      const dto = { name: 'Test Product', price: 99.99 } as any;
      productRepository.create.mockResolvedValue(mockProduct);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.createProduct(dto);

      expect(productRepository.findById).toHaveBeenCalledWith('product-1', {
        include: { images: true, variants: { include: { options: true } } },
      });
    });
  });

  describe('updateProduct', () => {
    it('should update product data only when no images or variants provided', async () => {
      const dto = { name: 'Updated Name' } as any;
      productRepository.update.mockResolvedValue({
        ...mockProduct,
        name: 'Updated Name',
      });
      productRepository.findById.mockResolvedValue({
        ...mockProduct,
        name: 'Updated Name',
      });

      await service.updateProduct('product-1', dto);

      expect(productRepository.transaction).toHaveBeenCalled();
      expect(productRepository.update).toHaveBeenCalledWith('product-1', {
        name: 'Updated Name',
      });
      expect(productImageRepository.deleteMany).not.toHaveBeenCalled();
      expect(productVariantRepository.deleteMany).not.toHaveBeenCalled();
    });

    it('should replace images when images array is provided', async () => {
      const dto = {
        name: 'Updated',
        images: [{ url: 'https://example.com/new.jpg', alt: 'new' }],
      } as any;
      productRepository.update.mockResolvedValue(mockProduct);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.updateProduct('product-1', dto);

      expect(productImageRepository.deleteMany).toHaveBeenCalledWith({
        productId: 'product-1',
      });
      expect(productImageRepository.createMany).toHaveBeenCalledWith([
        {
          productId: 'product-1',
          url: 'https://example.com/new.jpg',
          alt: 'new',
        },
      ]);
    });

    it('should delete images but not create when images is empty array', async () => {
      const dto = { images: [] } as any;
      productRepository.update.mockResolvedValue(mockProduct);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.updateProduct('product-1', dto);

      expect(productImageRepository.deleteMany).toHaveBeenCalledWith({
        productId: 'product-1',
      });
      expect(productImageRepository.createMany).not.toHaveBeenCalled();
    });

    it('should replace variants when variants array is provided', async () => {
      const dto = {
        variants: [
          {
            name: 'Size L',
            sku: 'SKU-L',
            price: 109.99,
            comparePrice: null,
            stock: 5,
            options: [],
          },
        ],
      } as any;
      const newVariant = { ...mockVariant, id: 'variant-2', name: 'Size L' };
      productRepository.update.mockResolvedValue(mockProduct);
      productVariantRepository.create.mockResolvedValue(newVariant);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.updateProduct('product-1', dto);

      expect(productVariantRepository.deleteMany).toHaveBeenCalledWith({
        productId: 'product-1',
      });
      expect(productVariantRepository.create).toHaveBeenCalled();
    });

    it('should re-fetch product with includes after update', async () => {
      const dto = { name: 'Updated' } as any;
      productRepository.update.mockResolvedValue(mockProduct);
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.updateProduct('product-1', dto);

      expect(productRepository.findById).toHaveBeenCalledWith('product-1', {
        include: { images: true, variants: { include: { options: true } } },
      });
    });
  });

  describe('deleteProduct', () => {
    it('should delegate to productRepository.delete', async () => {
      productRepository.delete.mockResolvedValue(mockProduct);

      await service.deleteProduct('product-1');

      expect(productRepository.delete).toHaveBeenCalledWith('product-1');
    });
  });

  describe('getProductById', () => {
    it('should fetch product by id', async () => {
      productRepository.findById.mockResolvedValue(mockProduct);

      await service.getProductById('product-1');

      expect(productRepository.findById).toHaveBeenCalledWith('product-1');
    });
  });

  describe('getAllProducts', () => {
    it('should return paginated products without cursor', async () => {
      productRepository.findAll.mockResolvedValue([mockProduct]);

      const result = await service.getAllProducts(undefined, 10);

      expect(productRepository.findAll).toHaveBeenCalledWith({ take: 11 });
      expect(result.limit).toBe(10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
    });

    it('should use cursor when provided', async () => {
      productRepository.findAll.mockResolvedValue([mockProduct]);

      await service.getAllProducts('cursor-abc', 10);

      expect(productRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-abc' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) => ({
        ...mockProduct,
        id: `product-${i}`,
      }));
      productRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAllProducts(undefined, 10);

      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('product-9');
      expect(result.items).toHaveLength(10);
    });
  });
});
