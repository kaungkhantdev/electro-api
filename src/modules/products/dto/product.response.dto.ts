import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '@/modules/category/dto/category.response.dto';

@Exclude()
export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  sku: string;
  barcode: string;
  price: number;
  comparePrice: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  brand: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  status: string;
  isFeatured: boolean;
  publishedAt: string;
  category: CategoryResponseDto;
  images: ProductImageResponseDto[];
  variants: ProductVariantResponseDto[];
}

@Exclude()
export class ProductImageResponseDto {
  id: string;
  url: string;
  alt: string;
  position: number;
}

@Exclude()
export class ProductVariantResponseDto {
  id: string;
  name: string;
  sku: string;
  price: number;
  comparePrice: number;
  stock: number;
  image: string;
  isActive: boolean;
  options: ProductVariantOptionResponseDto[];
}

@Exclude()
export class ProductVariantOptionResponseDto {
  id: string;
  optionName: string;
  optionValue: string;
}

export class PaginatedProductsResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  items: ProductResponseDto[];

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 'clx123abc', nullable: true })
  nextCursor: string | null;

  @ApiProperty({ example: true })
  hasNextPage: boolean;
}
