import { IRepository } from '@/common/repository';
import { Address } from 'generated/prisma/client';
import { CreateAddressDto } from '../dto/address.dto';

export const ADDRESS_REPOSITORY = Symbol('IAddressRepository');

export interface IAddressRepository extends IRepository<Address> {
  createAddress(address: CreateAddressDto): Promise<Address>;
}
