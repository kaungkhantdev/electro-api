import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({
    description: 'Name',
    example: 'Stripe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Provider',
    example: 'stripe',
  })
  @IsString()
  provider: string;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Config',
    example: '{}',
  })
  @IsObject()
  config: any;
}

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
