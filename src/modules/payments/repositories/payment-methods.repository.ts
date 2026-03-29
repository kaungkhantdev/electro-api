import { IRepository } from '@/common/repository';
import { PaymentMethod } from 'generated/prisma/client';
import { CreatePaymentMethodDto } from '../dto/payment-methods.dto';

export const PAYMENT_METHODS_REPOSITORY = Symbol('IPaymentMethodsRepository');

export interface IPaymentMethodsRepository extends IRepository<PaymentMethod> {
  createPaymentMethod(
    paymentMethod: CreatePaymentMethodDto,
  ): Promise<PaymentMethod>;
}
