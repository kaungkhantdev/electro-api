import { IsString, IsOptional } from 'class-validator';
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
  icon: string;

  @ApiProperty({
    description: 'Category parent id',
    example: 'Category parent id',
  })
  @IsString()
  @IsOptional()
  parentId: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
