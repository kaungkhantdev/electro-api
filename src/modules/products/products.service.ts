import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from './repositories/interfaces/product.repository.interface';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
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

  async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    return this.productRepository.transaction(async () => {
      // Create the main product
      const product = await this.productRepository.create(data);

      // Create product images if provided
      if (data.images?.length) {
        await this.productImageRepository.createMany(
          data.images.map((image) => ({
            productId: product.id,
            ...image,
          })),
        );
      }

      // Create product variants and their options if provided
      if (data.variants?.length) {
        // Create variants one by one to handle their nested options
        for (const variantData of data.variants) {
          const { options, ...variantFields } = variantData;

          // Create the variant
          const variant = await this.productVariantRepository.create({
            productId: product.id,
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

      // Return the created product with all relations
      const createdProduct = await this.productRepository.findById(product.id, {
        include: {
          images: true,
          variants: {
            include: {
              options: true,
            },
          },
        },
      });

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
      // Extract nested fields from update data
      const { images, variants, ...productData } = data;

      // Update the main product
      const product = await this.productRepository.update(id, productData);

      // Update images if provided - replace all existing images
      if (images !== undefined) {
        // Delete existing images
        await this.productImageRepository.deleteMany({
          productId: id,
        });

        // Create new images
        if (images.length > 0) {
          await this.productImageRepository.createMany(
            images.map((image) => ({
              productId: product.id,
              ...image,
            })),
          );
        }
      }

      // Update variants if provided - replace all existing variants
      if (variants !== undefined) {
        // Delete existing variants (cascade will delete options)
        await this.productVariantRepository.deleteMany({
          productId: id,
        });

        // Create new variants with their options
        if (variants.length > 0) {
          for (const variantData of variants) {
            const { options: variantOptions, ...variantFields } = variantData;

            // Create the variant
            const variant = await this.productVariantRepository.create({
              productId: product.id,
              name: variantFields.name,
              sku: variantFields.sku,
              price: variantFields.price,
              comparePrice: variantFields.comparePrice,
              stock: variantFields.stock,
            });

            // Create variant options if provided
            if (variantOptions?.length) {
              await this.productVariantOptionRepository.createMany(
                variantOptions.map((option) => ({
                  variantId: variant.id,
                  optionName: option.optionName,
                  optionValue: option.optionValue,
                })),
              );
            }
          }
        }
      }

      // Return the updated product with all relations
      const updatedProduct = await this.productRepository.findById(product.id, {
        include: {
          images: true,
          variants: {
            include: {
              options: true,
            },
          },
        },
      });

      return plainToInstance(ProductResponseDto, updatedProduct, {
        excludeExtraneousValues: true,
      });
    });
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
