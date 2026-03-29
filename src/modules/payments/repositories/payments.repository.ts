import { IRepository } from '@/common/repository';
import { Payment } from 'generated/prisma/client';
import { CreatePaymentDto } from '../dto/payments.dto';

export const PAYMENTS_REPOSITORY = Symbol('IPaymentsRepository');

export interface IPaymentsRepository extends IRepository<Payment> {
  createPayment(payment: CreatePaymentDto): Promise<Payment>;
}
