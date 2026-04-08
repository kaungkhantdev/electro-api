import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from './repositories/interfaces/product.repository.interface';
import {
  CreateProductDto,
  UpdateProductDto,
  UpdateProductImageDto,
  UpdateProductVariantDto,
  UpdateProductVariantOptionDto,
} from './dto/products.dto';
import { plainToInstance } from 'class-transformer';
import {
  PaginatedProductsResponseDto,
  ProductResponseDto,
} from './dto/product.response.dto';
import {
  IProductImageRepository,
  PRODUCT_IMAGE_REPOSITORY,
} from './repositories/interfaces/product-image.repository.interface';
import {
  IProductVariantOptionRepository,
  PRODUCT_VARIANT_OPTION_REPOSITORY,
} from './repositories/interfaces/product-variant-option.repository.interface';
import {
  IProductVariantRepository,
  PRODUCT_VARIANT_REPOSITORY,
} from './repositories/interfaces/product-variant.repository.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_IMAGE_REPOSITORY)
    private readonly productImageRepository: IProductImageRepository,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepository: IProductVariantRepository,
    @Inject(PRODUCT_VARIANT_OPTION_REPOSITORY)
    private readonly productVariantOptionRepository: IProductVariantOptionRepository,
  ) {}

  private async createImages(
    productId: string,
    images: CreateProductDto['images'],
  ) {
    if (images?.length) {
      await this.productImageRepository.createMany(
        images.map((image) => ({
          productId,
          ...image,
        })),
      );
    }
  }

  private async createVariants(
    productId: string,
    variants: CreateProductDto['variants'],
  ) {
    if (variants?.length) {
      for (const variantData of variants) {
        const { options, ...variantFields } = variantData;

        // Create the variant
        const variant = await this.productVariantRepository.create({
          productId,
          name: variantFields.name,
          sku: variantFields.sku,
          price: variantFields.price,
          comparePrice: variantFields.comparePrice,
          stock: variantFields.stock,
        });

        // Create variant options if provided
        if (options?.length) {
          await this.productVariantOptionRepository.createMany(
            options.map((option) => ({
              variantId: variant.id,
              optionName: option.optionName,
              optionValue: option.optionValue,
            })),
          );
        }
      }
    }
  }

  private readonly includeRelations = {
    include: { images: true, variants: { include: { options: true } } },
  };

  async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    return this.productRepository.transaction(async () => {
      const product = await this.productRepository.create(data);

      await this.createImages(product.id, data.images);
      await this.createVariants(product.id, data.variants);

      const createdProduct = await this.productRepository.findById(
        product.id,
        this.includeRelations,
      );
      return plainToInstance(ProductResponseDto, createdProduct, {
        excludeExtraneousValues: true,
      });
    });
  }

  async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productRepository.transaction(async () => {
      const { images, variants, ...productData } = data;

      const product = await this.productRepository.update(id, productData);

      if (images !== undefined) {
        await this.productImageRepository.deleteMany({ productId: id });
        if (images.length) {
          await this.productImageRepository.createMany(
            images.map((image) => ({ productId: id, ...image })),
          );
        }
      }

      if (variants !== undefined) {
        await this.productVariantRepository.deleteMany({ productId: id });
        await this.createVariants(product.id, variants);
      }

      const updatedProduct = await this.productRepository.findById(
        product.id,
        this.includeRelations,
      );

      return plainToInstance(ProductResponseDto, updatedProduct, {
        excludeExtraneousValues: true,
      });
    });
  }

  async updateProductImage(id: string, data: UpdateProductImageDto) {
    return this.productImageRepository.update(id, data);
  }

  async updateProductVariant(id: string, data: UpdateProductVariantDto) {
    return this.productVariantRepository.update(id, data);
  }

  async updateProductOption(id: string, data: UpdateProductVariantOptionDto) {
    return this.productVariantOptionRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.delete(id);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async getProductById(id: string): Promise<ProductResponseDto | null> {
    const product = await this.productRepository.findById(id);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async getAllProducts(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedProductsResponseDto> {
    const rows = await this.productRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: plainToInstance(ProductResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      limit,
      nextCursor,
      hasNextPage,
    };
  }
}
