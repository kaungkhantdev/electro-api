import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RolesGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CursorPaginationDto } from '@/common/dto/cursor-pagination.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';

@Controller('admin/payments')
@UseGuards(RolesGuard)
export class AdminPaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all payments (Admin only)',
    description:
      'Returns a paginated list of all payments. Requires ADMIN role.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payments list retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User does not have ADMIN role' })
  async findAll(@Query() pagination: CursorPaginationDto) {
    return await this.paymentsService.getAllPayments(
      pagination.cursor,
      pagination.limit,
    );
  }

  @Get('payment-methods')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all payment methods (Admin only)',
    description:
      'Returns a paginated list of all payment methods. Requires ADMIN role.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment methods list retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User does not have ADMIN role' })
  async findAllPaymentMethods(@Query() pagination: CursorPaginationDto) {
    return await this.paymentsService.getAllPaymentMethods(
      pagination.cursor,
      pagination.limit,
    );
  }

  @Get('payment-audit-logs')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all payment audit logs (Admin only)',
    description:
      'Returns a paginated list of all payment audit logs. Requires ADMIN role.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment audit logs list retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @ApiForbiddenResponse({ description: 'User does not have ADMIN role' })
  async findAllPaymentAuditLogs(@Query() pagination: CursorPaginationDto) {
    return await this.paymentsService.getAllPaymentAuditLogs(
      pagination.cursor,
      pagination.limit,
    );
  }
}
