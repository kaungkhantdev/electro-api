import { IRepository } from '@/common/repository';
import { OrderItem } from 'generated/prisma/client';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dto/orders.dto';

export interface IOrderItemsRepository extends IRepository<OrderItem> {
  createOrderItem(data: CreateOrderItemDto): Promise<OrderItem>;
  updateOrderItem(id: string, data: UpdateOrderItemDto): Promise<OrderItem>;
}

export const ORDER_ITEMS_REPOSITORY = Symbol('IOrderItemsRepository');
