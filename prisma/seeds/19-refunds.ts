import {
  PrismaClient,
  Order,
  Payment,
  User,
} from '../../generated/prisma/client';

export async function seedRefunds(
  prisma: PrismaClient,
  refundedOrders: Order[],
  payments: Payment[],
  adminUser: User,
  customers: User[],
) {
  const refundPayments = payments.filter((p) => p.status === 'REFUNDED');

  await Promise.all(
    refundedOrders.map(async (order, i) => {
      const relatedPayment = refundPayments[i] ?? payments[0];
      return prisma.refund.upsert({
        where: { id: `ref-${order.id}` },
        update: {},
        create: {
          id: `ref-${order.id}`,
          orderId: order.id,
          paymentId: relatedPayment?.id ?? null,
          amount: order.total,
          currency: 'USD',
          status: 'COMPLETED',
          provider: 'stripe',
          reason: i % 2 === 0 ? 'customer_request' : 'damaged_goods',
          refundType: 'FULL',
          refundMethod: 'ORIGINAL_PAYMENT_METHOD',
          initiatedBy: customers[i % customers.length].id,
          approvedBy: adminUser.id,
          notes: 'Customer requested full refund. Approved by admin.',
          approvedAt: new Date(),
          processedAt: new Date(),
        },
      });
    }),
  );

  console.log(`✓ ${refundedOrders.length} refunds seeded`);
}
