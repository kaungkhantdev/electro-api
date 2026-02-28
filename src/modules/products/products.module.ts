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
import { CategoryController } from './category.controller';
import { AdminCategoryController } from './admin.category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/category.repository';
import { CATEGORY_REPOSITORY } from './repositories/interfaces/category.repository.interface';

@Module({
  imports: [],
  controllers: [
    CategoryController,
    AdminCategoryController,
    AdminProductController,
    ProductsController,
  ],
  providers: [
    ProductService,
    CategoryService,
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
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
  exports: [],
})
export class ProductsModule {}
