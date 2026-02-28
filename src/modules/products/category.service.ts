import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from './repositories/interfaces/category.repository.interface';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { plainToInstance } from 'class-transformer';
import {
  CategoryReponseDto,
  PaginatedCategoriesResponseDto,
} from './dto/category.response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async createCategory(data: CreateCategoryDto): Promise<CategoryReponseDto> {
    const category = await this.categoryRepository.create(data);
    return plainToInstance(CategoryReponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryReponseDto> {
    const category = await this.categoryRepository.update(id, data);
    return plainToInstance(CategoryReponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async deleteCategory(id: string): Promise<CategoryReponseDto> {
    const category = await this.categoryRepository.delete(id);
    return plainToInstance(CategoryReponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async getCategoryById(id: string): Promise<CategoryReponseDto | null> {
    const category = await this.categoryRepository.findById(id);
    return plainToInstance(CategoryReponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async getAllCategories(
    page: number,
    limit: number,
  ): Promise<PaginatedCategoriesResponseDto> {
    const skip = (page - 1) * limit;
    const [categories, total] = await Promise.all([
      this.categoryRepository.findAll({ skip, take: limit }),
      this.categoryRepository.count(),
    ]);

    return {
      items: plainToInstance(CategoryReponseDto, categories, {
        excludeExtraneousValues: true,
      }),
      page,
      limit,
      total,
    };
  }
}
