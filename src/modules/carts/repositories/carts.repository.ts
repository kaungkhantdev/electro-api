import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { CartItem, Prisma } from 'generated/prisma/client';
import { ICartRepository } from './interfaces/carts.repository.interface';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CartsRepository
  extends GenericRepository<CartItem>
  implements ICartRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.CartItem);
  }

  async findByUserId(userId: string): Promise<CartItem | null> {
    return await this.model.findUnique({
      where: { userId },
    });
  }
}
