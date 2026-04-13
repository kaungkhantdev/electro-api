import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { BRAND_REPOSITORY } from './repositories/interface/brand.repository.interface';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockBrand = {
  id: '1',
  name: 'Brand 1',
  slug: 'brand-1',
  description: 'Description for Brand 1',
  logo: 'https://example.com/logo1.png',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('BrandService', () => {
  let brandService: BrandService;
  let brandRepository: {
    findAll: jest.Mock;
    findById: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findBySlug: jest.Mock;
  };

  beforeEach(async () => {
    brandRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findBySlug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandService,
        { provide: BRAND_REPOSITORY, useValue: brandRepository },
      ],
    }).compile();
    brandService = module.get<BrandService>(BrandService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBrand', () => {
    it('should generate a slug for the brand', async () => {
      const dto = {
        name: mockBrand.name,
        description: mockBrand.description,
        logo: mockBrand.logo,
      };
      brandRepository.findBySlug.mockResolvedValue(null);
      brandRepository.create.mockResolvedValue({ ...dto, slug: 'brand-1' });

      const result = await brandService.createBrand(dto);
      expect(result).toEqual({ ...dto, slug: 'brand-1' });
      expect(brandRepository.create).toHaveBeenCalledWith({
        ...dto,
        slug: 'brand-1',
      });
    });

    it('should throw an error if the slug already exists', async () => {
      const dto = {
        name: mockBrand.name,
        description: mockBrand.description,
        logo: mockBrand.logo,
      };
      brandRepository.findBySlug.mockResolvedValue({ slug: 'brand-1' });
      await expect(brandService.createBrand(dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updateBrand', () => {
    it('should update the brand', async () => {
      const dto = {
        name: mockBrand.name,
        description: mockBrand.description,
        logo: mockBrand.logo,
      };
      brandRepository.findById.mockResolvedValue(mockBrand);
      brandRepository.findBySlug.mockResolvedValue(null);
      brandRepository.update.mockResolvedValue({ ...dto, slug: 'brand-1' });

      const result = await brandService.updateBrand(mockBrand.id, dto);
      expect(result).toEqual({ ...dto, slug: 'brand-1' });
      expect(brandRepository.update).toHaveBeenCalledWith(mockBrand.id, {
        ...dto,
        slug: 'brand-1',
      });
    });

    it('should throw error if the slug name is already taken', async () => {
      const dto = {
        name: 'Brand 2',
        description: mockBrand.description,
        logo: mockBrand.logo,
      };
      brandRepository.findById.mockResolvedValue(mockBrand);
      brandRepository.findBySlug.mockResolvedValue({ slug: 'brand-1' });
      await expect(brandService.updateBrand(mockBrand.id, dto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw error if id is not found', async () => {
      const dto = {
        name: mockBrand.name,
        description: mockBrand.description,
        logo: mockBrand.logo,
      };
      brandRepository.findById.mockResolvedValue(null);
      await expect(brandService.updateBrand(mockBrand.id, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getBrandById', () => {
    it('should find the brand by id', async () => {
      brandRepository.findById.mockResolvedValue(mockBrand);
      const result = await brandService.getBrandById(mockBrand.id);
      expect(result).toEqual(mockBrand);
    });

    it('should throw error if id is not found', async () => {
      brandRepository.findById.mockResolvedValue(null);
      await expect(brandService.getBrandById(mockBrand.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getBrandBySlug', () => {
    it('should find the brand by slug', async () => {
      brandRepository.findBySlug.mockResolvedValue(mockBrand);
      const result = await brandService.getBrandBySlug(mockBrand.slug);
      expect(result).toEqual(mockBrand);
    });

    it('should throw error if slug is not found', async () => {
      brandRepository.findBySlug.mockResolvedValue(null);
      await expect(brandService.getBrandBySlug(mockBrand.slug)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteBrand', () => {
    it('should delete the brand', async () => {
      brandRepository.findById.mockResolvedValue(mockBrand);
      brandRepository.delete.mockResolvedValue(undefined);
      await brandService.deleteBrand(mockBrand.id);
      expect(brandRepository.delete).toHaveBeenCalledWith(mockBrand.id);
    });

    it('should throw error if id is not found', async () => {
      brandRepository.findById.mockResolvedValue(null);
      brandRepository.delete.mockResolvedValue(null);
      await expect(brandService.deleteBrand(mockBrand.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllBrands', () => {
    it('should return paginated brands without cursor', async () => {
      const rows = [mockBrand, { ...mockBrand, id: '2' }];
      brandRepository.findAll.mockResolvedValue(rows);

      const result = await brandService.getAllBrands(undefined, 10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
      expect(result.items).toHaveLength(2);
    });

    it('should use cursor when provided', async () => {
      brandRepository.findAll.mockResolvedValue([mockBrand]);

      await brandService.getAllBrands('cursor-2', 10);
      expect(brandRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-2' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) => ({
        ...mockBrand,
        id: `brand-${i}`,
      }));
      brandRepository.findAll.mockResolvedValue(rows);

      const result = await brandService.getAllBrands(undefined, 10);
      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('brand-9');
      expect(result.items).toHaveLength(10);
    });
  });
});
