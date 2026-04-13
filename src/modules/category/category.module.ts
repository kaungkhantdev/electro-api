import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { AdminCategoryController } from './admin.category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/category.repository';
import { CATEGORY_REPOSITORY } from './repositories/interfaces/category.repository.interface';

@Module({
  imports: [],
  controllers: [CategoryController, AdminCategoryController],
  providers: [
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
  exports: [],
})
export class CategoryModule {}
