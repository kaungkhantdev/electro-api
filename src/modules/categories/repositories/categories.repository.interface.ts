import { IRepository } from '@/shared/repositories';
import { Category } from 'generated/prisma/browser';

/**
 * Category-specific repository interface
 * Extends generic IRepository and adds domain-specific methods
 */
export interface ICategoriesRepository extends IRepository<Category> {
  findByName(name: string): Promise<Category | null>;
  findByIdIncludingProducts(id: string): Promise<Category | null>;
  hasProducts(id: string): Promise<boolean>;
}

export const CATEGORIES_REPOSITORY = Symbol('CATEGORIES_REPOSITORY');
