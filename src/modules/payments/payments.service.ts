import { Inject, Injectable } from '@nestjs/common';
import { PAYMENTS_REPOSITORY } from './repositories/payments.repository';
import { IPaymentsRepository } from './repositories/interfaces/payments.repository.interface';
import {
  PAYMENT_METHODS_REPOSITORY,
  IPaymentMethodsRepository,
} from './repositories/interfaces/payment-methods.repository.interface';
import {
  PAYMENT_AUDIT_LOGS_REPOSITORY,
  IPaymentAuditLogsRepository,
} from './repositories/interfaces/payment-audit-logs.repository.interface';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payments.dto';
import { plainToInstance } from 'class-transformer';
import {
  PaginatedPaymentAuditLogsResponseDto,
  PaginatedPaymentMethodsResponseDto,
  PaginatedPaymentsResponseDto,
  PaymentAuditLogsResponseDto,
  PaymentMethodsResponseDto,
  PaymentsResponseDto,
} from './dto/payments.response.dto';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/payment-methods.dto';
import { CreatePaymentAuditLogDto } from './dto/payment-audit-logs.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENTS_REPOSITORY)
    private readonly paymentsRepository: IPaymentsRepository,

    @Inject(PAYMENT_METHODS_REPOSITORY)
    private readonly paymentMethodsRepository: IPaymentMethodsRepository,

    @Inject(PAYMENT_AUDIT_LOGS_REPOSITORY)
    private readonly paymentAuditLogsRepository: IPaymentAuditLogsRepository,
  ) {}

  async createPayment(data: CreatePaymentDto): Promise<PaymentsResponseDto> {
    const payment = await this.paymentsRepository.createPayment(data);
    return plainToInstance(PaymentsResponseDto, payment, {
      excludeExtraneousValues: true,
    });
  }

  async createPaymentMethod(
    data: CreatePaymentMethodDto,
  ): Promise<PaymentMethodsResponseDto> {
    const paymentMethod =
      await this.paymentMethodsRepository.createPaymentMethod(data);
    return plainToInstance(PaymentMethodsResponseDto, paymentMethod, {
      excludeExtraneousValues: true,
    });
  }

  async createPaymentAuditLog(
    data: CreatePaymentAuditLogDto,
  ): Promise<PaymentAuditLogsResponseDto> {
    const paymentAuditLog =
      await this.paymentAuditLogsRepository.createPaymentAuditLog(data);
    return plainToInstance(PaymentAuditLogsResponseDto, paymentAuditLog, {
      excludeExtraneousValues: true,
    });
  }

  async getAllPayments(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedPaymentsResponseDto> {
    const rows = await this.paymentsRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: plainToInstance(PaymentsResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      limit,
      nextCursor,
      hasNextPage,
    };
  }

  async getAllPaymentMethods(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedPaymentMethodsResponseDto> {
    const rows = await this.paymentMethodsRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: plainToInstance(PaymentMethodsResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      limit,
      nextCursor,
      hasNextPage,
    };
  }

  async getAllPaymentAuditLogs(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedPaymentAuditLogsResponseDto> {
    const rows = await this.paymentAuditLogsRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: plainToInstance(PaymentAuditLogsResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      limit,
      nextCursor,
      hasNextPage,
    };
  }

  async getPaymentById(id: string): Promise<PaymentsResponseDto> {
    const payment = await this.paymentsRepository.findById(id);
    return plainToInstance(PaymentsResponseDto, payment, {
      excludeExtraneousValues: true,
    });
  }

  async getPaymentMethodById(id: string): Promise<PaymentMethodsResponseDto> {
    const paymentMethod = await this.paymentMethodsRepository.findById(id);
    return plainToInstance(PaymentMethodsResponseDto, paymentMethod, {
      excludeExtraneousValues: true,
    });
  }

  async getPaymentAuditLogById(
    id: string,
  ): Promise<PaymentAuditLogsResponseDto> {
    const paymentAuditLog = await this.paymentAuditLogsRepository.findById(id);
    return plainToInstance(PaymentAuditLogsResponseDto, paymentAuditLog, {
      excludeExtraneousValues: true,
    });
  }

  async updatePayment(
    id: string,
    data: UpdatePaymentDto,
  ): Promise<PaymentsResponseDto> {
    const payment = await this.paymentsRepository.update(id, data);
    return plainToInstance(PaymentsResponseDto, payment, {
      excludeExtraneousValues: true,
    });
  }

  async updatePaymentMethod(
    id: string,
    data: UpdatePaymentMethodDto,
  ): Promise<PaymentMethodsResponseDto> {
    const paymentMethod = await this.paymentMethodsRepository.update(id, data);
    return plainToInstance(PaymentMethodsResponseDto, paymentMethod, {
      excludeExtraneousValues: true,
    });
  }
}
