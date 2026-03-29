import { IRepository } from '@/common/repository';
import { ProductImage } from 'generated/prisma/client';
import { ProductImageDto as CreateProductImageDto } from '../../dto/products.dto';

export const PRODUCT_IMAGE_REPOSITORY = Symbol('IProductImageRepository');

export interface IProductImageRepository extends IRepository<ProductImage> {
  create(
    data: CreateProductImageDto & { productId: string },
  ): Promise<ProductImage>;
}
