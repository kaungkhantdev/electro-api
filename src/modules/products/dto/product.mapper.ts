import { plainToInstance } from 'class-transformer';
import { Product } from 'generated/prisma/client';
import { ProductResponseDto } from './product.response.dto';

export class ProductMapper {
  static toResponseDto(product: Product): ProductResponseDto;
  static toResponseDto(product: Product | null): ProductResponseDto | null;
  static toResponseDto(products: Product[]): ProductResponseDto[];
  static toResponseDto(
    input: Product | Product[] | null,
  ): ProductResponseDto | ProductResponseDto[] | null {
    if (input === null) return null;
    return plainToInstance(ProductResponseDto, input, {
      excludeExtraneousValues: true,
    });
  }
}
