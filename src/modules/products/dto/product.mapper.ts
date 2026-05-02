import { plainToInstance } from 'class-transformer';
import { Prisma, Product } from 'generated/prisma/client';
import { ProductResponseDto } from './product.response.dto';

function serializeDecimals(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (value instanceof Prisma.Decimal) return Number(value);
  if (Array.isArray(value)) return value.map(serializeDecimals);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serializeDecimals(v)]),
    );
  }
  return value;
}

export class ProductMapper {
  static toResponseDto(product: Product): ProductResponseDto;
  static toResponseDto(product: Product | null): ProductResponseDto | null;
  static toResponseDto(products: Product[]): ProductResponseDto[];
  static toResponseDto(
    input: Product | Product[] | null,
  ): ProductResponseDto | ProductResponseDto[] | null {
    if (input === null) return null;
    return plainToInstance(ProductResponseDto, serializeDecimals(input), {
      excludeExtraneousValues: true,
    });
  }
}
