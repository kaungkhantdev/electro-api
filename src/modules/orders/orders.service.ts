import { Inject, Injectable } from '@nestjs/common';
import { IOrderItemsRepository } from './repositories/order-items.repository.interface';
import { IOrdersRepository } from './repositories/orders.repository.interface';
import { ORDERS_REPOSITORY } from './repositories/orders.repository.interface';
import { ORDER_ITEMS_REPOSITORY } from './repositories/order-items.repository.interface';
import { Order } from 'generated/prisma/browser';
import { CreateOrderDto, UpdateOrderDto } from './dto/orders.dto';
import {
  OrderResponseDto,
  PaginatedOrdersResponseDto,
} from './dto/orders.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepository: IOrdersRepository,
    @Inject(ORDER_ITEMS_REPOSITORY)
    private readonly orderItemsRepository: IOrderItemsRepository,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.transaction(async () => {
      const order = await this.ordersRepository.createOrder(data);
      await this.orderItemsRepository.create({
        ...data.orderItems,
        orderId: order.id,
      });
      return order;
    });
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    return this.ordersRepository.transaction(async () => {
      const order = await this.ordersRepository.updateOrder(id, data);

      await this.orderItemsRepository.deleteMany({
        orderId: id,
      });

      await this.orderItemsRepository.create({
        ...data.orderItems,
        orderId: order.id,
      });
      return order;
    });
  }

  async deleteOrder(id: string): Promise<Order> {
    return this.ordersRepository.transaction(async () => {
      await this.orderItemsRepository.deleteMany({
        orderId: id,
      });
      return this.ordersRepository.delete(id);
    });
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<PaginatedOrdersResponseDto> {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.ordersRepository.findAll({ skip, take: limit }),
      this.ordersRepository.count(),
    ]);

    return {
      items: plainToInstance(OrderResponseDto, users, {
        excludeExtraneousValues: true,
      }),
      page,
      limit,
      total,
    };
  }

  async getById(id: string): Promise<OrderResponseDto> {
    const order = await this.ordersRepository.findById(id);
    return plainToInstance(OrderResponseDto, order, {
      excludeExtraneousValues: true,
    });
  }
}
