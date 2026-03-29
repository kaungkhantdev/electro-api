import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Product ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Variant ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  variantId: string;

  @ApiProperty({
    description: 'Quantity',
    example: 1,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Name',
    example: 'Product 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'SKU',
    example: 'SKU1',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'Price',
    example: 100,
  })
  @IsNumber()
  price: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
