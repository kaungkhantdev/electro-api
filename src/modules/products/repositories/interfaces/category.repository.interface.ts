import { IRepository } from '@/common/repository';
import { Category } from 'generated/prisma/client';

export const CATEGORY_REPOSITORY = Symbol('ICategoryRepository');

export interface ICategoryRepository extends IRepository<Category> {
  findBySlug(slug: string): Promise<Category | null>;
}
