import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  icon: string;

  @Expose()
  parentId: string;

  @Expose()
  position: number;

  @Expose()
  isActive: boolean;
}

export class PaginatedCategoriesResponseDto {
  @ApiProperty({ type: [CategoryResponseDto] })
  items: CategoryResponseDto[];

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 'clx123abc', nullable: true })
  nextCursor: string | null;

  @ApiProperty({ example: true })
  hasNextPage: boolean;
}
