import {
  PrismaClient,
  Payment,
  User,
  Prisma,
} from '../../generated/prisma/client';

type AuditLogInput = Prisma.PaymentAuditLogCreateManyInput;

export async function seedPaymentAuditLogs(
  prisma: PrismaClient,
  payments: Payment[],
  customers: User[],
) {
  const logs: AuditLogInput[] = payments.flatMap((pay, i) => {
    const entries: AuditLogInput[] = [
      {
        orderId: pay.orderId,
        action: 'PAYMENT_CREATED',
        amount: pay.amount,
        currency: pay.currency,
        status: 'PENDING',
        provider: pay.provider,
        paymentMethodId: pay.paymentMethodId,
        actorType: 'USER',
        actorId: customers[i % customers.length].id,
      },
      {
        orderId: pay.orderId,
        action: 'PAYMENT_COMPLETED',
        amount: pay.amount,
        currency: pay.currency,
        status: 'PAID',
        provider: pay.provider,
        transactionId: pay.transactionId,
        paymentMethodId: pay.paymentMethodId,
        actorType: 'WEBHOOK',
        metadata: { event: 'charge.succeeded' },
      },
    ];

    if (pay.status === 'REFUNDED') {
      entries.push({
        orderId: pay.orderId,
        action: 'REFUND_INITIATED',
        amount: pay.amount,
        currency: pay.currency,
        status: 'REFUNDED',
        provider: pay.provider,
        paymentMethodId: pay.paymentMethodId,
        actorType: 'USER',
        actorId: customers[i % customers.length].id,
      });
    }

    return entries;
  });

  await prisma.paymentAuditLog.createMany({ data: logs.slice(0, 30) });
  console.log(`✓ ${Math.min(logs.length, 30)} payment audit logs seeded`);
}
