import {
  PrismaClient,
  Order,
  PaymentMethod,
} from '../../generated/prisma/client';

export async function seedPayments(
  prisma: PrismaClient,
  orders: Order[],
  paymentMethods: PaymentMethod[],
  paidStatuses: string[],
) {
  const paidOrders = orders.filter(
    (_, i) => paidStatuses[i] === 'PAID' || paidStatuses[i] === 'REFUNDED',
  );

  const pmCycle = [
    paymentMethods[0],
    paymentMethods[1],
    paymentMethods[2],
    paymentMethods[3],
    paymentMethods[0],
  ];

  const payments = await Promise.all(
    paidOrders.map((order, i) =>
      prisma.payment.upsert({
        where: { id: `pay-${order.id}` },
        update: {},
        create: {
          id: `pay-${order.id}`,
          orderId: order.id,
          amount: order.total,
          currency: 'USD',
          status: order.paymentStatus === 'REFUNDED' ? 'REFUNDED' : 'PAID',
          provider: pmCycle[i % pmCycle.length].provider,
          transactionId: `txn_${Math.random().toString(36).substring(2, 18)}`,
          paymentMethodId: pmCycle[i % pmCycle.length].id,
        },
      }),
    ),
  );

  console.log(`✓ ${payments.length} payments seeded`);
  return payments;
}
