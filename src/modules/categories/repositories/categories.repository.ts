import { GenericRepository } from '@/shared/repositories';
import { Injectable } from '@nestjs/common';
import { Category, Prisma } from 'generated/prisma/client';
import { ICategoriesRepository } from './categories.repository.interface';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CategoriesRepository
  extends GenericRepository<Category>
  implements ICategoriesRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Category);
  }

  findByName(name: string): Promise<Category | null> {
    return this.model.findUnique({
      where: { name },
    });
  }

  findByIdIncludingProducts(id: string): Promise<Category | null> {
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
