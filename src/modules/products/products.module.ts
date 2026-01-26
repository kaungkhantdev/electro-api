import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PRODUCTS_REPOSITORY } from './repositories/products.repository.interface';
import { ProductsRepository } from './repositories/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: ProductsRepository,
    },
  ],
})
export class ProductsModule {}
