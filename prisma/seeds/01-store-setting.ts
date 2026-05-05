import { PrismaClient } from '../../generated/prisma/client';

export async function seedStoreSetting(prisma: PrismaClient) {
  const setting = await prisma.storeSetting.upsert({
    where: { id: 'store-setting-1' },
    update: {},
    create: {
      id: 'store-setting-1',
      storeName: 'Electro Store',
      storeEmail: 'support@electro.com',
      storePhone: '+1-800-555-0100',
      currency: 'USD',
      timezone: 'America/New_York',
      address: '123 Commerce Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      metaTitle: 'Electro – Your Electronics Destination',
      metaDescription: 'Shop the latest electronics, gadgets, and accessories.',
      facebook: 'https://facebook.com/electrostore',
      instagram: 'https://instagram.com/electrostore',
      twitter: 'https://twitter.com/electrostore',
      taxRate: 8.5,
      taxEnabled: true,
    },
  });

  console.log('✓ Store setting seeded');
  return setting;
}
