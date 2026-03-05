import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaymentsResponseDto {
  @Expose()
  id: string;

  @Expose()
  orderId: string;

  @Expose()
  amount: number;

  @Expose()
  currency: string;

  @Expose()
  status: string;

  @Expose()
  paymentMethodId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

@Exclude()
export class PaymentMethodsResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  type: string;

  @Expose()
  provider: string;

  @Expose()
  details: string;

  @Expose()
  isDefault: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

@Exclude()
export class PaymentAuditLogsResponseDto {
  @Expose()
  id: string;

  @Expose()
  paymentId: string;

  @Expose()
  action: string;

  @Expose()
  oldStatus: string;

  @Expose()
  newStatus: string;

  @Expose()
  metadata: string;

  @Expose()
  createdAt: Date;
}

export class PaginatedPaymentsResponseDto {
  @Expose()
  items: PaymentsResponseDto[];

  @Expose()
  limit: number;

  @Expose()
  nextCursor: string | null;

  @Expose()
  hasNextPage: boolean;
}

export class PaginatedPaymentMethodsResponseDto {
  @Expose()
  items: PaymentMethodsResponseDto[];

  @Expose()
  limit: number;

  @Expose()
  nextCursor: string | null;

  @Expose()
  hasNextPage: boolean;
}

export class PaginatedPaymentAuditLogsResponseDto {
  @Expose()
  items: PaymentAuditLogsResponseDto[];

  @Expose()
  limit: number;

  @Expose()
  nextCursor: string | null;

  @Expose()
  hasNextPage: boolean;
}
