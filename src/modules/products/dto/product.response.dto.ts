import { Exclude } from 'class-transformer';
import { CategoryReponseDto } from './category.response.dto';
import { ApiProperty } from '@nestjs/swagger';

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
  vendor: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  status: string;
  isFeatured: boolean;
  publishedAt: string;
  category: CategoryReponseDto;
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

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;
}
