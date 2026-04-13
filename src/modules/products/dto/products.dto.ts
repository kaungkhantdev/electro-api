import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class ProductImageDto {
  @ApiProperty({
    description: 'Product image url',
    example: 'Product image url',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Product image alt',
    example: 'Product image alt',
  })
  @IsString()
  @IsOptional()
  alt: string;

  @ApiProperty({
    description: 'Product image position',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  position: number;
}

export class UpdateProductImageDto extends PartialType(ProductImageDto) {}

export class ProductVariantOptionDto {
  @ApiProperty({
    description: 'Product variant option name',
    example: 'Product variant option name',
  })
  @IsString()
  optionName: string;

  @ApiProperty({
    description: 'Product variant option value',
    example: 'Product variant option value',
  })
  @IsString()
  optionValue: string;
}

export class UpdateProductVariantOptionDto extends PartialType(
  ProductVariantOptionDto,
) {}

export class ProductVariantDto {
  @ApiProperty({
    description: 'Product variant name',
    example: 'Product variant name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product variant sku',
    example: 'Product variant sku',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'Product variant price',
    example: 100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Product variant compare price',
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  comparePrice: number;

  @ApiProperty({
    description: 'Product variant stock',
    example: 100,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'Product variant options',
    example: 'Product variant options',
    type: [ProductVariantOptionDto],
  })
  @IsArray()
  @IsOptional()
  options?: ProductVariantOptionDto[];
}

export class UpdateProductVariantDto extends PartialType(ProductVariantDto) {}

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Product name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Product description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product sku',
    example: 'Product sku',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'Product barcode',
    example: 'Product barcode',
  })
  @IsString()
  @IsOptional()
  barcode: string;

  @ApiProperty({
    description: 'Product price',
    example: 100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Product compare price',
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  comparePrice: number;

  @ApiProperty({
    description: 'Product cost price',
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  costPrice: number;

  @ApiProperty({
    description: 'Product stock',
    example: 100,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'Product low stock threshold',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  lowStockThreshold: number;

  @ApiProperty({
    description: 'Product track inventory',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  trackInventory: boolean;

  @ApiProperty({
    description: 'Product allow backorder',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  allowBackorder: boolean;

  @ApiProperty({
    description: 'Product brand',
    example: 'Product brand',
  })
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty({
    description: 'Product vendor',
    example: 'Product vendor',
  })
  @IsString()
  @IsOptional()
  vendor: string;

  @ApiProperty({
    description: 'Product tags',
    example: 'Product tags',
  })
  @IsString()
  @IsOptional()
  tags: string[];

  @ApiProperty({
    description: 'Product meta title',
    example: 'Product meta title',
  })
  @IsString()
  @IsOptional()
  metaTitle: string;

  @ApiProperty({
    description: 'Product meta description',
    example: 'Product meta description',
  })
  @IsString()
  @IsOptional()
  metaDescription: string;

  @ApiProperty({
    description: 'Product status',
    example: 'Product status',
  })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({
    description: 'Product is featured',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @ApiProperty({
    description: 'Product published at',
    example: 'Product published at',
  })
  @IsString()
  @IsOptional()
  publishedAt: string;

  @ApiProperty({
    description: 'Product category id',
    example: 'Product category id',
  })
  @IsString()
  @IsOptional()
  categoryId: string;

  @ApiProperty({
    description: 'Product images',
    example: [
      {
        url: 'https://example.com/image.jpg',
        alt: 'Product image',
        position: 1,
      },
    ],
    type: [ProductImageDto],
  })
  @IsArray()
  @IsOptional()
  images: ProductImageDto[];

  @ApiProperty({
    description: 'Product variants',
    example: [
      {
        name: 'Variant name',
        sku: 'VARIANT-SKU-001',
        price: 100,
        comparePrice: 120,
        stock: 50,
        options: [
          {
            optionName: 'Color',
            optionValue: 'Red',
          },
        ],
      },
    ],
    type: [ProductVariantDto],
  })
  @IsArray()
  @IsOptional()
  variants: ProductVariantDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
