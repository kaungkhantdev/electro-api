import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { CursorPaginationDto } from '@/common/dto/cursor-pagination.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin/orders')
@UseGuards(RolesGuard)
@ApiBearerAuth('JWT-auth')
@Roles(UserRole.ADMIN)
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Returns a paginated list of all orders.',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders list retrieved successfully',
  })
  async getAll(@Query() pagination: CursorPaginationDto) {
    return await this.ordersService.getAll(pagination.cursor, pagination.limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Returns a specific order by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved successfully',
  })
  async getById(@Param('id') id: string) {
    return await this.ordersService.getById(id);
  }
}
