import { IRepository } from '@/common/repository';
import { Product } from 'generated/prisma/client';

export const PRODUCT_REPOSITORY = Symbol('IProductRepository');

export interface IProductRepository extends IRepository<Product> {
  findBySlug(slug: string): Promise<Product | null>;
}
