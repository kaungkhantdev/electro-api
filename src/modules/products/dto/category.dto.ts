import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'Category description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Category image',
    example: 'Category image',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    description: 'Category status',
    example: 'Category status',
  })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({
    description: 'Category is featured',
    example: 'Category is featured',
  })
  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @ApiProperty({
    description: 'Category parent id',
    example: 'Category parent id',
  })
  @IsOptional()
  @IsString()
  parentId?: string | null;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
