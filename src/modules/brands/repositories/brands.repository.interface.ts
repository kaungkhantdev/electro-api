import { IRepository } from '@/shared/repositories';
import { Brand } from 'generated/prisma/client';

/**
 * Brand-specific repository interface
 * Extends generic IRepository and adds domain-specific methods
 */
export interface IBrandsRepository extends IRepository<Brand> {
  findByName(name: string): Promise<Brand | null>;
  findByIdIncludingProducts(id: string): Promise<Brand | null>;
  hasProducts(id: string): Promise<boolean>;
}

export const BRANDS_REPOSITORY = Symbol('BRANDS_REPOSITORY');
