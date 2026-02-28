import { Exclude } from 'class-transformer';

@Exclude()
export class AddressResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  type: string;
}

@Exclude()
export class PaginatedAddressResponseDto {
  items: AddressResponseDto[];
  page: number;
  limit: number;
  total: number;
}
