import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from '@/common/utils/pagination.util';
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
import {
  PaginatedProductsResponseDto,
  ProductResponseDto,
} from './dto/product.response.dto';
import { ProductMapper } from './dto/product.mapper';
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
import { PrismaService } from '@/database/prisma.service';

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
    private readonly prisma: PrismaService,
  ) {}

  private generateSlug(name: string): string {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    const suffix = Math.random().toString(36).slice(2, 7);
    return `${base}-${suffix}`;
  }

  private async createProductTags(productId: string, tags: string[]) {
    if (!tags?.length) return;
    for (const tagName of tags) {
      const tag = await this.prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      await this.prisma.productTag.create({
        data: { productId, tagId: tag.id },
      });
    }
  }

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

  private async validateCategoryId(categoryId?: string) {
    if (!categoryId) return;
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
  }

  private async validateBrandId(brandId?: string) {
    if (!brandId) return;
    const brand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    });
    if (!brand) throw new NotFoundException('Brand not found');
  }

  private readonly includeRelations = {
    include: { images: true, variants: { include: { options: true } } },
  };

  async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    await this.validateCategoryId(data.categoryId);
    await this.validateBrandId(data.brandId);
    return this.productRepository.transaction(async () => {
      const { images, variants, tags, ...productData } = data;
      const product = await this.productRepository.create({
        ...productData,
        slug: this.generateSlug(data.name),
      });
      await this.createImages(product.id, images);
      await this.createVariants(product.id, variants);
      await this.createProductTags(product.id, tags);
      const createdProduct = await this.productRepository.findById(
        product.id,
        this.includeRelations,
      );
      return ProductMapper.toResponseDto(createdProduct)!;
    });
  }

  async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    await this.validateCategoryId(data.categoryId);
    await this.validateBrandId(data.brandId);
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

      return ProductMapper.toResponseDto(updatedProduct)!;
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
    return ProductMapper.toResponseDto(product);
  }

  async getProductById(id: string): Promise<ProductResponseDto | null> {
    const product = await this.productRepository.findById(id);
    return ProductMapper.toResponseDto(product);
  }

  async getAllProducts(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedProductsResponseDto> {
    const rows = await this.productRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const { items, hasNextPage, nextCursor } = paginate(rows, limit);

    return {
      items: ProductMapper.toResponseDto(items),
      limit,
      nextCursor,
      hasNextPage,
    };
  }
}
