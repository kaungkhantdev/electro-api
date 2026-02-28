import { IRepository } from '@/common/repository';
import { CartItem } from 'generated/prisma/client';

export const CART_REPOSITORY = Symbol('ICartRepository');

export interface ICartRepository extends IRepository<CartItem> {
  findByUserId(userId: string): Promise<CartItem | null>;
}
