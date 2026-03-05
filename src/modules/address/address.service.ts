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
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedAddressResponseDto> {
    const rows = await this.addressRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: plainToInstance(AddressResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      limit,
      nextCursor,
      hasNextPage,
    };
  }
}
