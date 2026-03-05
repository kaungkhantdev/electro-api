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
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedCategoriesResponseDto> {
    const rows = await this.categoryRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: plainToInstance(CategoryReponseDto, items, {
        excludeExtraneousValues: true,
      }),
      limit,
      nextCursor,
      hasNextPage,
    };
  }
}
