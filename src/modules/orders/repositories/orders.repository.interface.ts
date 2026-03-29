import { IRepository } from '@/common/repository';
import { Order } from 'generated/prisma/client';
import { CreateOrderDto, UpdateOrderDto } from '../dto/orders.dto';

export interface IOrdersRepository extends IRepository<Order> {
  createOrder(data: CreateOrderDto): Promise<Order>;
  updateOrder(id: string, data: UpdateOrderDto): Promise<Order>;
}

export const ORDERS_REPOSITORY = Symbol('IOrdersRepository');
