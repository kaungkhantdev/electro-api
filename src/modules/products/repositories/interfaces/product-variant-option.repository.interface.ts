import { IRepository } from '@/common/repository';
import { ProductVariantOption } from 'generated/prisma/client';
import { ProductVariantOptionDto as CreateProductVariantOptionDto } from '../../dto/products.dto';

export const PRODUCT_VARIANT_OPTION_REPOSITORY = Symbol(
  'IProductVariantOptionRepository',
);

export interface IProductVariantOptionRepository extends IRepository<ProductVariantOption> {
  create(
    data: CreateProductVariantOptionDto & { variantId: string },
  ): Promise<ProductVariantOption>;
}
