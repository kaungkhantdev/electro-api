import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { ProductVariantOption, Prisma } from 'generated/prisma/client';
import { IProductVariantOptionRepository } from './interfaces/product-variant-option.repository.interface';
import { ProductVariantOptionDto as CreateProductVariantOptionDto } from '../dto/products.dto';

@Injectable()
export class ProductVariantOptionRepository
  extends GenericRepository<ProductVariantOption>
  implements IProductVariantOptionRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.ProductVariantOption);
  }

  async create(
    data: CreateProductVariantOptionDto & { variantId: string },
  ): Promise<ProductVariantOption> {
    return await this.model.create({ data });
  }
}
