import { PrismaClient } from '../../generated/prisma/client';

export async function seedPaymentMethods(prisma: PrismaClient) {
  const methods = await Promise.all([
    prisma.paymentMethod.upsert({
      where: { id: 'pm-stripe' },
      update: {},
      create: {
        id: 'pm-stripe',
        name: 'Credit/Debit Card',
        provider: 'stripe',
        isActive: true,
      },
    }),
    prisma.paymentMethod.upsert({
      where: { id: 'pm-paypal' },
      update: {},
      create: {
        id: 'pm-paypal',
        name: 'PayPal',
        provider: 'paypal',
        isActive: true,
      },
    }),
    prisma.paymentMethod.upsert({
      where: { id: 'pm-apple' },
      update: {},
      create: {
        id: 'pm-apple',
        name: 'Apple Pay',
        provider: 'apple_pay',
        isActive: true,
      },
    }),
    prisma.paymentMethod.upsert({
      where: { id: 'pm-google' },
      update: {},
      create: {
        id: 'pm-google',
        name: 'Google Pay',
        provider: 'google_pay',
        isActive: true,
      },
    }),
    prisma.paymentMethod.upsert({
      where: { id: 'pm-affirm' },
      update: {},
      create: {
        id: 'pm-affirm',
        name: 'Affirm (Buy Now Pay Later)',
        provider: 'affirm',
        isActive: true,
      },
    }),
  ]);

  console.log(`✓ ${methods.length} payment methods seeded`);
  return methods;
}
