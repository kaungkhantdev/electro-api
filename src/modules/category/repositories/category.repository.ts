import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Category, Prisma } from 'generated/prisma/client';
import { ICategoryRepository } from './interfaces/category.repository.interface';

@Injectable()
export class CategoryRepository
  extends GenericRepository<Category>
  implements ICategoryRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Category);
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return await this.model.findUnique({
      where: { slug },
    });
  }
}
