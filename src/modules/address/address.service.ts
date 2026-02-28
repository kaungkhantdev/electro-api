import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './repositories/address.repository';
import { ADDRESS_REPOSITORY } from './repositories/address.repository.interface';
import { Address } from 'generated/prisma/client';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import {
  AddressResponseDto,
  PaginatedAddressResponseDto,
} from './dto/address.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: AddressRepository,
  ) {}

  async createAddress(address: CreateAddressDto): Promise<Address> {
    return this.addressRepository.createAddress(address);
  }

  async updateAddress(id: string, address: UpdateAddressDto): Promise<Address> {
    return this.addressRepository.update(id, address);
  }

  async deleteAddress(id: string): Promise<Address> {
    return this.addressRepository.delete(id);
  }

  async getAddress(id: string): Promise<Address> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<PaginatedAddressResponseDto> {
    const skip = (page - 1) * limit;
    const [addresses, total] = await Promise.all([
      this.addressRepository.findAll({ skip, take: limit }),
      this.addressRepository.count(),
    ]);

    return {
      items: plainToInstance(AddressResponseDto, addresses, {
        excludeExtraneousValues: true,
      }),
      page,
      limit,
      total,
    };
  }
}
