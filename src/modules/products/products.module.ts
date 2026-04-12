import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductRepository } from './repositories/product.repository';
import { PRODUCT_REPOSITORY } from './repositories/interfaces/product.repository.interface';
import { ProductImageRepository } from './repositories/product-image.repository';
import { PRODUCT_IMAGE_REPOSITORY } from './repositories/interfaces/product-image.repository.interface';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { PRODUCT_VARIANT_REPOSITORY } from './repositories/interfaces/product-variant.repository.interface';
import { ProductVariantOptionRepository } from './repositories/product-variant-option.repository';
import { PRODUCT_VARIANT_OPTION_REPOSITORY } from './repositories/interfaces/product-variant-option.repository.interface';
import { AdminProductController } from './admin.product.controller';
import { ProductsController } from './products.controller';

@Module({
  imports: [],
  controllers: [AdminProductController, ProductsController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    {
      provide: PRODUCT_IMAGE_REPOSITORY,
      useClass: ProductImageRepository,
    },
    {
      provide: PRODUCT_VARIANT_REPOSITORY,
      useClass: ProductVariantRepository,
    },
    {
      provide: PRODUCT_VARIANT_OPTION_REPOSITORY,
      useClass: ProductVariantOptionRepository,
    },
  ],
  exports: [],
})
export class ProductsModule {}
