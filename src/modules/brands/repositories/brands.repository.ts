import { GenericRepository } from '@/shared/repositories';
import { Injectable } from '@nestjs/common';
import { Brand, Prisma } from 'generated/prisma/client';
import { IBrandsRepository } from './brands.repository.interface';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class BrandsRepository
  extends GenericRepository<Brand>
  implements IBrandsRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.User);
  }

  findByName(name: string): Promise<Brand | null> {
    return this.model.findUnique({
      where: { name },
    });
  }

  findByIdIncludingProducts(id: string): Promise<Brand | null> {
    return this.model.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  hasProducts(id: string): Promise<boolean> {
    return this.model
      .count({
        where: {
          id,
          products: {
            some: {},
          },
        },
      })
      .then((count) => count > 0);
  }
}
