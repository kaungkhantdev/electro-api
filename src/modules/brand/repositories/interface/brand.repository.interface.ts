import { IRepository } from '@/common/repository';
import { Brand } from 'generated/prisma/client';

export const BRAND_REPOSITORY = Symbol('IBrandRepository');

export interface IBrandRepository extends IRepository<Brand> {
  findBySlug(slug: string): Promise<Brand | null>;
}
