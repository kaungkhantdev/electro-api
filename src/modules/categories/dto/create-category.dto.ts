import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'IPhone' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'This is IPhone category',
  })
  @IsString()
  @Optional()
  description?: string;

  @ApiProperty({
    description: 'Parent category ID',
    example: '609e129e8a1b2c0015b8f8b4',
    required: false,
  })
  @IsString()
  @Optional()
  parentId: string;
}
