import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { PaginatedAddressResponseDto } from './dto/address.response.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Address } from 'generated/prisma/client';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({
    summary: 'Create address',
    description: 'Create address',
  })
  async createAddress(@Body() address: CreateAddressDto): Promise<Address> {
    return this.addressService.createAddress(address);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all addresses',
    description: 'Get all addresses',
  })
  async getAll(
    @Query() data: PaginationDto,
  ): Promise<PaginatedAddressResponseDto> {
    return this.addressService.getAll(data.page, data.limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get address by ID',
    description: 'Get address by ID',
  })
  async getAddress(@Param('id') id: string): Promise<Address> {
    return this.addressService.getAddress(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update address by ID',
    description: 'Update address by ID',
  })
  async updateAddress(
    @Param('id') id: string,
    @Body() address: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.updateAddress(id, address);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete address by ID',
    description: 'Delete address by ID',
  })
  async deleteAddress(@Param('id') id: string): Promise<Address> {
    return this.addressService.deleteAddress(id);
  }
}
