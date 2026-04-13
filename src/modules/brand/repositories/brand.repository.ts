import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Brand, Prisma } from 'generated/prisma/client';
import { IBrandRepository } from './interface/brand.repository.interface';

@Injectable()
export class BrandRepository
  extends GenericRepository<Brand>
  implements IBrandRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Brand);
  }

  async findBySlug(slug: string): Promise<Brand | null> {
    return await this.model.findUnique({
      where: { slug },
    });
  }
}
