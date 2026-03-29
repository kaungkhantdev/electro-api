import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Company',
    example: 'Company',
  })
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Address line 1',
    example: '123 Main St',
  })
  @IsString()
  address1: string;

  @ApiProperty({
    description: 'Address line 2',
    example: '123 Main St',
  })
  @IsString()
  address2: string;

  @ApiProperty({
    description: 'City',
    example: 'New York',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'State',
    example: 'NY',
  })
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Zip code',
    example: '10001',
  })
  @IsString()
  zipCode: string;

  @ApiProperty({
    description: 'Country',
    example: 'USA',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Phone',
    example: '1234567890',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Is default',
    example: true,
  })
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty({
    description: 'Type',
    example: 'SHIPPING',
  })
  @IsString()
  type: string;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
