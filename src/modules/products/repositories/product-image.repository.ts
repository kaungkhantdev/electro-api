import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Prisma, ProductImage } from 'generated/prisma/client';
import { IProductImageRepository } from './interfaces/product-image.repository.interface';
import { ProductImageDto as CreateProductImageDto } from '../dto/products.dto';

@Injectable()
export class ProductImageRepository
  extends GenericRepository<ProductImage>
  implements IProductImageRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.ProductImage);
  }

  async create(
    data: CreateProductImageDto & { productId: string },
  ): Promise<ProductImage> {
    return await this.model.create({ data });
  }
}
