import { IRepository } from '@/common/repository';
import { WishlistItem } from 'generated/prisma/client';

export const WISHLIST_REPOSITORY = Symbol('IWishlistRepository');

export interface IWishlistRepository extends IRepository<WishlistItem> {
  findByUserId(userId: string): Promise<WishlistItem | null>;
}
