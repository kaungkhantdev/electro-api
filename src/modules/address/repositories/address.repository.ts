import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { Address, Prisma } from 'generated/prisma/client';
import { IAddressRepository } from './address.repository.interface';
import { PrismaService } from '@/database/prisma.service';
import { CreateAddressDto } from '../dto/address.dto';

@Injectable()
export class AddressRepository
  extends GenericRepository<Address>
  implements IAddressRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Address);
  }

  async createAddress(address: CreateAddressDto): Promise<Address> {
    return this.create(address);
  }
}
