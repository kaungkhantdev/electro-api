import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '@/modules/category/dto/category.response.dto';
import { BrandResponseDto } from '@/modules/brand/dto/brand.response.dto';

const toNumber = ({ value }: { value: unknown }) =>
  value != null ? Number(value) : null;

@Exclude()
export class ProductResponseDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() description!: string;
  @Expose() sku!: string;
  @Expose() barcode!: string;
  @Expose() @Transform(toNumber) price!: number;
  @Expose() @Transform(toNumber) comparePrice!: number | null;
  @Expose() @Transform(toNumber) costPrice!: number | null;
  @Expose() stock!: number;
  @Expose() lowStockThreshold!: number;
  @Expose() trackInventory!: boolean;
  @Expose() allowBackorder!: boolean;
  @Expose() metaTitle!: string;
  @Expose() metaDescription!: string;
  @Expose() status!: string;
  @Expose() isFeatured!: boolean;
  @Expose() publishedAt!: string;
  @Expose() @Type(() => BrandResponseDto) brand!: BrandResponseDto | null;
  @Expose()
  @Type(() => CategoryResponseDto)
  category!: CategoryResponseDto | null;
  @Expose()
  @Type(() => ProductImageResponseDto)
  images!: ProductImageResponseDto[];
  @Expose()
  @Type(() => ProductVariantResponseDto)
  variants!: ProductVariantResponseDto[];
  @Expose()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((pt: any) => pt.tag?.name).filter(Boolean)
      : [],
  )
  tags!: string[];
}

@Exclude()
export class ProductImageResponseDto {
  @Expose() id!: string;
  @Expose() url!: string;
  @Expose() alt!: string;
  @Expose() position!: number;
}

@Exclude()
export class ProductVariantResponseDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() sku!: string;
  @Expose() @Transform(toNumber) price!: number | null;
  @Expose() @Transform(toNumber) comparePrice!: number | null;
  @Expose() stock!: number;
  @Expose() image!: string;
  @Expose() isActive!: boolean;
  @Expose()
  @Type(() => ProductVariantOptionResponseDto)
  options!: ProductVariantOptionResponseDto[];
}

@Exclude()
export class ProductVariantOptionResponseDto {
  @Expose() id!: string;
  @Expose() optionName!: string;
  @Expose() optionValue!: string;
}

export class PaginatedProductsResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  items!: ProductResponseDto[];

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 'clx123abc', nullable: true })
  nextCursor!: string | null;

  @ApiProperty({ example: true })
  hasNextPage!: boolean;
}
