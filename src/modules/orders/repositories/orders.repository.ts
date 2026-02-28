import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { Order } from 'generated/prisma/client';
import { IOrdersRepository } from './orders.repository.interface';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CreateOrderDto, UpdateOrderDto } from '../dto/orders.dto';

@Injectable()
export class OrdersRepository
  extends GenericRepository<Order>
  implements IOrdersRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.Order);
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.model.create({ data });
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    return this.model.update({ where: { id }, data });
  }
}
