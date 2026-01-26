import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CATEGORIES_REPOSITORY,
  ICategoriesRepository,
} from './repositories/categories.repository.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.create(createCategoryDto);
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [categories, total] = await Promise.all([
      this.categoriesRepository.findAll({ skip, take: limit }),
      this.categoriesRepository.count(),
    ]);

    return {
      items: categories,
      page,
      limit,
      total,
    };
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) throw new BadRequestException('Category not found');
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) throw new BadRequestException('Category not found');
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure category exists

    if (await this.categoriesRepository.hasProducts(id)) {
      throw new BadRequestException(
        'Cannot delete category with associated products',
      );
    }

    return await this.categoriesRepository.delete(id);
  }
}
