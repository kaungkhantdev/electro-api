import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateOrderItemDto } from './order-items.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Payment method ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  paymentMethodId: string;

  @ApiProperty({
    description: 'Shipping address ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  shippingAddressId: string;

  @ApiProperty({
    description: 'Billing address ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  billingAddressId: string;

  @ApiProperty({
    description: 'Order items',
    example: [
      {
        productId: '123e4567-e89b-12d3-a456-426614174000',
        variantId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 1,
        name: 'Product 1',
        sku: 'SKU1',
        price: 100,
      },
    ],
  })
  @IsArray()
  orderItems: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Customer note',
    example: 'Customer note',
  })
  @IsString()
  customerNote?: string;

  @ApiProperty({
    description: 'Internal note',
    example: 'Internal note',
  })
  @IsString()
  internalNote?: string;

  @ApiProperty({
    description: 'Coupon code',
    example: 'COUPON1',
  })
  @IsString()
  couponCode?: string;

  @ApiProperty({
    description: 'Shipping method',
    example: 'STANDARD',
  })
  @IsString()
  shippingMethod: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
