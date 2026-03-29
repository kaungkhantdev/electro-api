import { IRepository } from '@/common/repository';
import { ProductVariant } from 'generated/prisma/client';
import { ProductVariantDto as CreateProductVariantDto } from '../../dto/products.dto';

export const PRODUCT_VARIANT_REPOSITORY = Symbol('IProductVariantRepository');

export interface IProductVariantRepository extends IRepository<ProductVariant> {
  create(
    data: CreateProductVariantDto & { productId: string },
  ): Promise<ProductVariant>;
}
