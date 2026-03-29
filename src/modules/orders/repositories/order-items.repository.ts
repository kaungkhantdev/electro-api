import { GenericRepository } from '@/common/repository';
import { Injectable } from '@nestjs/common';
import { OrderItem } from 'generated/prisma/client';
import { IOrderItemsRepository } from './order-items.repository.interface';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dto/order-items.dto';

@Injectable()
export class OrderItemsRepository
  extends GenericRepository<OrderItem>
  implements IOrderItemsRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, Prisma.ModelName.OrderItem);
  }

  async createOrderItem(data: CreateOrderItemDto): Promise<OrderItem> {
    return this.model.create({ data });
  }

  async updateOrderItem(
    id: string,
    data: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.model.update({ where: { id }, data });
  }
}
