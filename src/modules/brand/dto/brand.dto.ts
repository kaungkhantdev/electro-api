import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    description: 'Brand name',
    example: 'Electronics',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Brand description',
    example: 'Brand description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Brand image',
    example: 'Brand image',
  })
  @IsString()
  @IsOptional()
  logo: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
