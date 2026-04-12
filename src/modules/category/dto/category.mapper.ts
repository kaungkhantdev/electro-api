import { plainToInstance } from 'class-transformer';
import { Category } from 'generated/prisma/client';
import { CategoryResponseDto } from './category.response.dto';

export class CategoryMapper {
  static toResponseDto(category: Category): CategoryResponseDto;
  static toResponseDto(category: Category | null): CategoryResponseDto | null;
  static toResponseDto(categories: Category[]): CategoryResponseDto[];
  static toResponseDto(
    input: Category | Category[] | null,
  ): CategoryResponseDto | CategoryResponseDto[] | null {
    if (input === null) return null;
    return plainToInstance(CategoryResponseDto, input, {
      excludeExtraneousValues: true,
    });
  }
}
