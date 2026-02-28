import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Add product to cart',
    description: 'Adds a product to the cart.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product added to cart successfully',
  })
  async addProductToCart(@Body() body: CreateOrderDto) {
    return await this.ordersService.createOrder(body);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update product in cart',
    description: 'Updates a product in the cart.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated in cart successfully',
  })
  async updateProductInCart(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
  ) {
    return await this.ordersService.updateOrder(id, body);
  }
}
