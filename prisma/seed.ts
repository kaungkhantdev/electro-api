import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { seedStoreSetting } from './seeds/01-store-setting';
import { seedUsers } from './seeds/02-users';
import { seedBrands } from './seeds/03-brands';
import { seedCategories } from './seeds/04-categories';
import { seedTags } from './seeds/05-tags';
import { seedProducts } from './seeds/06-products';
import { seedProductImages } from './seeds/07-product-images';
import { seedProductVariants } from './seeds/08-product-variants';
import { seedProductTags } from './seeds/09-product-tags';
import { seedAddresses } from './seeds/10-addresses';
import { seedCoupons } from './seeds/11-coupons';
import { seedShipping } from './seeds/12-shipping';
import { seedPaymentMethods } from './seeds/13-payment-methods';
import { seedOrders } from './seeds/14-orders';
import { seedCartAndWishlist } from './seeds/15-cart-wishlist';
import { seedReviews } from './seeds/16-reviews';
import { seedPayments } from './seeds/17-payments';
import { seedPaymentAuditLogs } from './seeds/18-payment-audit-logs';
import { seedRefunds } from './seeds/19-refunds';
import { seedCouponUsages } from './seeds/20-coupon-usages';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...\n');

  await seedStoreSetting(prisma);

  const users = await seedUsers(prisma);
  const adminUser = users[1]; // Alice Admin
  const customers = users.slice(3); // skip 3 admin/super-admin users

  const brands = await seedBrands(prisma);
  const { parents, children } = await seedCategories(prisma);
  const tags = await seedTags(prisma);

  const products = await seedProducts(prisma, brands, children, parents);
  await seedProductImages(prisma, products);
  await seedProductVariants(prisma, products);
  await seedProductTags(prisma, products, tags);

  const addresses = await seedAddresses(prisma, customers);
  const coupons = await seedCoupons(prisma);
  await seedShipping(prisma);
  const paymentMethods = await seedPaymentMethods(prisma);

  const { orders, defs } = await seedOrders(
    prisma,
    customers,
    products,
    addresses,
    // paymentMethods,
  );

  await seedCartAndWishlist(prisma, customers, products);
  await seedReviews(prisma, customers, products);

  const paidStatuses = defs.map((d) => d.paymentStatus);
  const payments = await seedPayments(
    prisma,
    orders,
    paymentMethods,
    paidStatuses,
  );
  await seedPaymentAuditLogs(prisma, payments, customers);

  const refundedOrders = orders.filter(
    (_, i) =>
      defs[i].paymentStatus === 'REFUNDED' || defs[i].status === 'CANCELLED',
  );
  await seedRefunds(prisma, refundedOrders, payments, adminUser, customers);

  await seedCouponUsages(prisma, customers, coupons, orders);

  console.log('\n✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
