import { plainToInstance } from 'class-transformer';

import { Brand } from 'generated/prisma/client';
import { BrandResponseDto } from './brand.response.dto';

export class BrandMapper {
  static toResponseDto(brand: Brand | null): BrandResponseDto | null;
  static toResponseDto(brands: Brand[]): BrandResponseDto[];
  static toResponseDto(
    input: Brand | Brand[] | null,
  ): BrandResponseDto | BrandResponseDto[] | null {
    if (input === null) return null;
    return plainToInstance(BrandResponseDto, input, {
      excludeExtraneousValues: true,
    });
  }
}
