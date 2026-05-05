import { PrismaClient } from '../../generated/prisma/client';

export async function seedShipping(prisma: PrismaClient) {
  const zones = await Promise.all([
    prisma.shippingZone.upsert({
      where: { id: 'zone-us' },
      update: {},
      create: { id: 'zone-us', name: 'United States', countries: ['US'] },
    }),
    prisma.shippingZone.upsert({
      where: { id: 'zone-ca' },
      update: {},
      create: { id: 'zone-ca', name: 'Canada', countries: ['CA'] },
    }),
    prisma.shippingZone.upsert({
      where: { id: 'zone-eu' },
      update: {},
      create: {
        id: 'zone-eu',
        name: 'Europe',
        countries: ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'SE', 'NO', 'DK'],
      },
    }),
    prisma.shippingZone.upsert({
      where: { id: 'zone-au' },
      update: {},
      create: {
        id: 'zone-au',
        name: 'Australia & NZ',
        countries: ['AU', 'NZ'],
      },
    }),
    prisma.shippingZone.upsert({
      where: { id: 'zone-asia' },
      update: {},
      create: {
        id: 'zone-asia',
        name: 'Asia Pacific',
        countries: ['JP', 'KR', 'SG', 'HK', 'TW', 'MY', 'TH'],
      },
    }),
  ]);

  await prisma.shippingRate.createMany({
    skipDuplicates: true,
    data: [
      {
        zoneId: zones[0].id,
        name: 'US Standard (under $50)',
        price: 5.99,
        minOrder: 0,
        maxOrder: 49.99,
        estimatedDays: '5-7 business days',
        isActive: true,
      },
      {
        zoneId: zones[0].id,
        name: 'US Standard (free over $50)',
        price: 0,
        minOrder: 50,
        estimatedDays: '5-7 business days',
        isActive: true,
      },
      {
        zoneId: zones[0].id,
        name: 'US Express (under $100)',
        price: 14.99,
        minOrder: 0,
        maxOrder: 99.99,
        estimatedDays: '2-3 business days',
        isActive: true,
      },
      {
        zoneId: zones[0].id,
        name: 'US Express (over $100)',
        price: 9.99,
        minOrder: 100,
        estimatedDays: '2-3 business days',
        isActive: true,
      },
      {
        zoneId: zones[0].id,
        name: 'US Overnight',
        price: 29.99,
        estimatedDays: '1 business day',
        isActive: true,
      },
      {
        zoneId: zones[0].id,
        name: 'US Free Standard (over $200)',
        price: 0,
        minOrder: 200,
        estimatedDays: '5-7 business days',
        isActive: true,
      },
      {
        zoneId: zones[1].id,
        name: 'Canada Standard',
        price: 12.99,
        estimatedDays: '7-10 business days',
        isActive: true,
      },
      {
        zoneId: zones[1].id,
        name: 'Canada Express',
        price: 24.99,
        estimatedDays: '3-5 business days',
        isActive: true,
      },
      {
        zoneId: zones[1].id,
        name: 'Canada Free (over $150)',
        price: 0,
        minOrder: 150,
        estimatedDays: '7-10 business days',
        isActive: true,
      },
      {
        zoneId: zones[1].id,
        name: 'Canada Overnight',
        price: 49.99,
        estimatedDays: '2 business days',
        isActive: false,
      },
      {
        zoneId: zones[2].id,
        name: 'Europe Economy',
        price: 9.99,
        maxOrder: 50,
        estimatedDays: '14-21 business days',
        isActive: true,
      },
      {
        zoneId: zones[2].id,
        name: 'Europe Standard',
        price: 19.99,
        estimatedDays: '10-14 business days',
        isActive: true,
      },
      {
        zoneId: zones[2].id,
        name: 'Europe Express',
        price: 39.99,
        estimatedDays: '5-7 business days',
        isActive: true,
      },
      {
        zoneId: zones[2].id,
        name: 'Europe Priority',
        price: 59.99,
        estimatedDays: '3-5 business days',
        isActive: true,
      },
      {
        zoneId: zones[3].id,
        name: 'Australia Standard',
        price: 24.99,
        estimatedDays: '10-15 business days',
        isActive: true,
      },
      {
        zoneId: zones[3].id,
        name: 'Australia Express',
        price: 44.99,
        estimatedDays: '5-8 business days',
        isActive: true,
      },
      {
        zoneId: zones[3].id,
        name: 'New Zealand Standard',
        price: 29.99,
        estimatedDays: '12-18 business days',
        isActive: true,
      },
      {
        zoneId: zones[4].id,
        name: 'Asia Pacific Standard',
        price: 22.99,
        estimatedDays: '8-12 business days',
        isActive: true,
      },
      {
        zoneId: zones[4].id,
        name: 'Asia Pacific Express',
        price: 42.99,
        estimatedDays: '4-6 business days',
        isActive: true,
      },
      {
        zoneId: zones[4].id,
        name: 'Japan Premium',
        price: 34.99,
        estimatedDays: '5-7 business days',
        isActive: true,
      },
    ],
  });

  console.log(`✓ ${zones.length} shipping zones and 20 rates seeded`);
  return zones;
}
