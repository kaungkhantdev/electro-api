import {
  PrismaClient,
  User,
  Coupon,
  Order,
} from '../../generated/prisma/client';

export async function seedCouponUsages(
  prisma: PrismaClient,
  customers: User[],
  coupons: Coupon[],
  orders: Order[],
) {
  const usages = customers.slice(0, 20).map((user, i) => ({
    id: `cu-${coupons[i % coupons.length].id}-${user.id}`,
    couponId: coupons[i % coupons.length].id,
    userId: user.id,
    orderId: orders[i % orders.length].id,
  }));

  for (const usage of usages) {
    await prisma.couponUsage.upsert({
      where: { id: usage.id },
      update: {},
      create: usage,
    });
  }

  console.log(`✓ ${usages.length} coupon usages seeded`);
}
