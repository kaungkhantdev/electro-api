import { PrismaClient } from '../../generated/prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  const parents = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'smartphones' },
      update: {},
      create: {
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones and mobile devices',
        position: 1,
        isFeatured: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'laptops' },
      update: {},
      create: {
        name: 'Laptops',
        slug: 'laptops',
        description: 'Powerful laptops for every need',
        position: 2,
        isFeatured: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'audio' },
      update: {},
      create: {
        name: 'Audio',
        slug: 'audio',
        description: 'Headphones, speakers and audio gear',
        position: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cameras' },
      update: {},
      create: {
        name: 'Cameras',
        slug: 'cameras',
        description: 'Digital cameras and photography gear',
        position: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Essential electronics accessories',
        position: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming' },
      update: {},
      create: {
        name: 'Gaming',
        slug: 'gaming',
        description: 'Gaming peripherals and hardware',
        position: 6,
        isFeatured: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'smart-home' },
      update: {},
      create: {
        name: 'Smart Home',
        slug: 'smart-home',
        description: 'Smart home devices and IoT',
        position: 7,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tvs-monitors' },
      update: {},
      create: {
        name: 'TVs & Monitors',
        slug: 'tvs-monitors',
        description: 'Displays for home and office',
        position: 8,
      },
    }),
  ]);

  const children = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'android-phones' },
      update: {},
      create: {
        name: 'Android Phones',
        slug: 'android-phones',
        description: 'Android smartphones',
        parentId: parents[0].id,
        position: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'iphones' },
      update: {},
      create: {
        name: 'iPhones',
        slug: 'iphones',
        description: 'Apple iPhones',
        parentId: parents[0].id,
        position: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming-laptops' },
      update: {},
      create: {
        name: 'Gaming Laptops',
        slug: 'gaming-laptops',
        description: 'High-performance gaming laptops',
        parentId: parents[1].id,
        position: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business-laptops' },
      update: {},
      create: {
        name: 'Business Laptops',
        slug: 'business-laptops',
        description: 'Laptops for professionals',
        parentId: parents[1].id,
        position: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'headphones' },
      update: {},
      create: {
        name: 'Headphones',
        slug: 'headphones',
        description: 'Over-ear and on-ear headphones',
        parentId: parents[2].id,
        position: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'earbuds' },
      update: {},
      create: {
        name: 'Earbuds',
        slug: 'earbuds',
        description: 'In-ear earbuds and TWS',
        parentId: parents[2].id,
        position: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dslr-cameras' },
      update: {},
      create: {
        name: 'DSLR Cameras',
        slug: 'dslr-cameras',
        description: 'Professional DSLR cameras',
        parentId: parents[3].id,
        position: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'action-cameras' },
      update: {},
      create: {
        name: 'Action Cameras',
        slug: 'action-cameras',
        description: 'Action and sport cameras',
        parentId: parents[3].id,
        position: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'chargers-cables' },
      update: {},
      create: {
        name: 'Chargers & Cables',
        slug: 'chargers-cables',
        description: 'Charging accessories',
        parentId: parents[4].id,
        position: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming-keyboards' },
      update: {},
      create: {
        name: 'Gaming Keyboards',
        slug: 'gaming-keyboards',
        description: 'Mechanical and gaming keyboards',
        parentId: parents[5].id,
        position: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming-mice' },
      update: {},
      create: {
        name: 'Gaming Mice',
        slug: 'gaming-mice',
        description: 'Precision gaming mice',
        parentId: parents[5].id,
        position: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'smart-speakers' },
      update: {},
      create: {
        name: 'Smart Speakers',
        slug: 'smart-speakers',
        description: 'Voice-activated smart speakers',
        parentId: parents[6].id,
        position: 1,
      },
    }),
  ]);

  const categories = [...parents, ...children];
  console.log(`✓ ${categories.length} categories seeded`);
  return { parents, children, categories };
}
