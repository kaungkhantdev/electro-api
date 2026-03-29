import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AdminOrdersController } from './admin.orders.controller';
import { ORDERS_REPOSITORY } from './repositories/orders.repository.interface';
import { OrdersRepository } from './repositories/orders.repository';
import { ORDER_ITEMS_REPOSITORY } from './repositories/order-items.repository.interface';
import { OrderItemsRepository } from './repositories/order-items.repository';

@Module({
  controllers: [OrdersController, AdminOrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDERS_REPOSITORY,
      useClass: OrdersRepository,
    },
    {
      provide: ORDER_ITEMS_REPOSITORY,
      useClass: OrderItemsRepository,
    },
  ],
})
export class OrdersModule {}
