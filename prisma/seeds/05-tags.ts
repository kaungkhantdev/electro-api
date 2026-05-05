import { PrismaClient } from '../../generated/prisma/client';

export async function seedTags(prisma: PrismaClient) {
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'New Arrival' },
      update: {},
      create: { name: 'New Arrival' },
    }),
    prisma.tag.upsert({
      where: { name: 'Best Seller' },
      update: {},
      create: { name: 'Best Seller' },
    }),
    prisma.tag.upsert({
      where: { name: 'Sale' },
      update: {},
      create: { name: 'Sale' },
    }),
    prisma.tag.upsert({
      where: { name: 'Wireless' },
      update: {},
      create: { name: 'Wireless' },
    }),
    prisma.tag.upsert({
      where: { name: 'Bluetooth' },
      update: {},
      create: { name: 'Bluetooth' },
    }),
    prisma.tag.upsert({
      where: { name: '4K' },
      update: {},
      create: { name: '4K' },
    }),
    prisma.tag.upsert({
      where: { name: 'Gaming' },
      update: {},
      create: { name: 'Gaming' },
    }),
    prisma.tag.upsert({
      where: { name: 'Noise Cancelling' },
      update: {},
      create: { name: 'Noise Cancelling' },
    }),
    prisma.tag.upsert({
      where: { name: 'Waterproof' },
      update: {},
      create: { name: 'Waterproof' },
    }),
    prisma.tag.upsert({
      where: { name: 'Fast Charging' },
      update: {},
      create: { name: 'Fast Charging' },
    }),
    prisma.tag.upsert({
      where: { name: 'USB-C' },
      update: {},
      create: { name: 'USB-C' },
    }),
    prisma.tag.upsert({
      where: { name: 'OLED' },
      update: {},
      create: { name: 'OLED' },
    }),
    prisma.tag.upsert({
      where: { name: 'AI-Powered' },
      update: {},
      create: { name: 'AI-Powered' },
    }),
    prisma.tag.upsert({
      where: { name: 'Refurbished' },
      update: {},
      create: { name: 'Refurbished' },
    }),
    prisma.tag.upsert({
      where: { name: 'Limited Edition' },
      update: {},
      create: { name: 'Limited Edition' },
    }),
    prisma.tag.upsert({
      where: { name: 'Eco-Friendly' },
      update: {},
      create: { name: 'Eco-Friendly' },
    }),
    prisma.tag.upsert({
      where: { name: 'Premium' },
      update: {},
      create: { name: 'Premium' },
    }),
    prisma.tag.upsert({
      where: { name: '5G' },
      update: {},
      create: { name: '5G' },
    }),
    prisma.tag.upsert({
      where: { name: 'Foldable' },
      update: {},
      create: { name: 'Foldable' },
    }),
    prisma.tag.upsert({
      where: { name: 'Smart' },
      update: {},
      create: { name: 'Smart' },
    }),
  ]);

  console.log(`✓ ${tags.length} tags seeded`);
  return tags;
}
