import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatePaymentAuditLogDto {
  @ApiProperty({
    description: 'Order ID',
    example: '123456789',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    description: 'Action',
    example: 'PAYMENT_CREATED',
  })
  @IsString()
  action: string;

  @ApiProperty({
    description: 'Amount',
    example: 100,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Currency',
    example: 'USD',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Provider',
    example: 'stripe',
  })
  @IsString()
  provider: string;

  @ApiProperty({
    description: 'Payment method ID',
    example: '123456789',
  })
  @IsString()
  paymentMethodId: string;

  @ApiProperty({
    description: 'Transaction ID',
    example: '123456789',
  })
  @IsString()
  transactionId: string;

  @ApiProperty({
    description: 'Actor ID',
    example: '123456789',
  })
  @IsString()
  actorId: string;

  @ApiProperty({
    description: 'Actor Type',
    example: 'USER',
  })
  @IsString()
  actorType: string;

  @ApiProperty({
    description: 'Metadata',
    example: '{}',
  })
  @IsString()
  metadata: string;
}
