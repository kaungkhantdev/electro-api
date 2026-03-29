import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { ProductVariant, Prisma } from 'generated/prisma/client';
import { IProductVariantRepository } from './interfaces/product-variant.repository.interface';
import { ProductVariantDto as CreateProductVariantDto } from '../dto/products.dto';

@Injectable()
export class ProductVariantRepository
  extends GenericRepository<ProductVariant>
  implements IProductVariantRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.ProductVariant);
  }

  async create(
    data: CreateProductVariantDto & { productId: string },
  ): Promise<ProductVariant> {
    return await this.model.create({ data });
  }
}
