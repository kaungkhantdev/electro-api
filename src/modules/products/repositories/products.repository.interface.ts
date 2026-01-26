import { IRepository } from '@/shared/repositories';
import { Product } from 'generated/prisma/client';

/**
 * Product-specific repository interface
 * Extends generic IRepository and adds domain-specific methods
 */
export interface IProductsRepository extends IRepository<Product> {
  findByIdIncludingCategory(id: string): Promise<Product | null>;
}

export const PRODUCTS_REPOSITORY = Symbol('PRODUCTS_REPOSITORY');
