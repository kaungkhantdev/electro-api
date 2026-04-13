import { Inject, Injectable } from '@nestjs/common';
import { paginate } from '@/common/utils/pagination.util';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from './repositories/interfaces/category.repository.interface';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import {
  CategoryResponseDto,
  PaginatedCategoriesResponseDto,
} from './dto/category.response.dto';
import { CategoryMapper } from './dto/category.mapper';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async createCategory(data: CreateCategoryDto): Promise<CategoryResponseDto> {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    const category = await this.categoryRepository.create({ ...data, slug });
    return CategoryMapper.toResponseDto(category);
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.update(id, data);
    return CategoryMapper.toResponseDto(category);
  }

  async deleteCategory(id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.delete(id);
    return CategoryMapper.toResponseDto(category);
  }

  async getCategoryById(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.findById(id);
    return CategoryMapper.toResponseDto(category);
  }

  async getAllCategories(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedCategoriesResponseDto> {
    const rows = await this.categoryRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const { items, hasNextPage, nextCursor } = paginate(rows, limit);

    return {
      items: CategoryMapper.toResponseDto(items),
      limit,
      nextCursor,
      hasNextPage,
    };
  }
}
