import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { Prisma, WishlistItem } from 'generated/prisma/client';
import { IWishlistRepository } from './interfaces/wishlists.repository.interface';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class WishlistsRepository
  extends GenericRepository<WishlistItem>
  implements IWishlistRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.WishlistItem);
  }

  async findByUserId(userId: string): Promise<WishlistItem | null> {
    return await this.model.findUnique({
      where: { userId },
    });
  }
}
