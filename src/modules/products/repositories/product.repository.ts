import { Injectable } from '@nestjs/common';
import { IProductRepository } from './interfaces/product.repository.interface';
import { Prisma, Product } from 'generated/prisma/client';
import { GenericRepository } from '@/common/repository';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class ProductRepository
  extends GenericRepository<Product>
  implements IProductRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Product);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.model.findUnique({ where: { slug } });
  }
}
