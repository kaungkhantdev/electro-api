import { IRepository } from '@/common/repository';
import { PaymentAuditLog } from 'generated/prisma/client';
import { CreatePaymentAuditLogDto } from '../../dto/payment-audit-logs.dto';

export const PAYMENT_AUDIT_LOGS_REPOSITORY = Symbol(
  'IPaymentAuditLogsRepository',
);

export interface IPaymentAuditLogsRepository extends IRepository<PaymentAuditLog> {
  createPaymentAuditLog(
    paymentAuditLog: CreatePaymentAuditLogDto,
  ): Promise<PaymentAuditLog>;
  findPaymentAuditLogByOrderId(orderId: string): Promise<PaymentAuditLog[]>;
}
