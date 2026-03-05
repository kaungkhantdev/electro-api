import { Exclude } from 'class-transformer';

@Exclude()
export class OrderResponseDto {
  id: string;
  userId: string;
  paymentMethodId: string;
  shippingAddressId: string;
  billingAddressId: string;
  orderItems: OrderItemResponseDto[];
  customerNote: string;
  internalNote: string;
  couponCode: string;
  shippingMethod: string;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

@Exclude()
export class OrderItemResponseDto {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  name: string;
  sku: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Exclude()
export class PaginatedOrdersResponseDto {
  items: OrderResponseDto[];
  limit: number;
  nextCursor: string | null;
  hasNextPage: boolean;
}
