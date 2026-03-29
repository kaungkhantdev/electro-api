import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryReponseDto {
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

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class PaginatedCategoriesResponseDto {
  @ApiProperty({ type: [CategoryReponseDto] })
  items: CategoryReponseDto[];

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 'clx123abc', nullable: true })
  nextCursor: string | null;

  @ApiProperty({ example: true })
  hasNextPage: boolean;
}
