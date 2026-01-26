import { GenericRepository } from '@/shared/repositories';
import { Injectable } from '@nestjs/common';
import { IProductsRepository } from './products.repository.interface';
import { PrismaService } from '@/database/prisma.service';
import { Prisma, Product } from 'generated/prisma/client';

@Injectable()
export class ProductsRepository
  extends GenericRepository<Product>
  implements IProductsRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Product);
  }

  async findByIdIncludingCategory(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }
}
