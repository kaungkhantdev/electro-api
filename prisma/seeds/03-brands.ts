import { PrismaClient } from '../../generated/prisma/client';

export async function seedBrands(prisma: PrismaClient) {
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'apple' },
      update: {},
      create: { name: 'Apple', slug: 'apple', description: 'Think Different.' },
    }),
    prisma.brand.upsert({
      where: { slug: 'samsung' },
      update: {},
      create: {
        name: 'Samsung',
        slug: 'samsung',
        description: 'Inspire the World, Create the Future.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'sony' },
      update: {},
      create: { name: 'Sony', slug: 'sony', description: 'Be Moved.' },
    }),
    prisma.brand.upsert({
      where: { slug: 'lg' },
      update: {},
      create: { name: 'LG', slug: 'lg', description: "Life's Good." },
    }),
    prisma.brand.upsert({
      where: { slug: 'dell' },
      update: {},
      create: {
        name: 'Dell',
        slug: 'dell',
        description: 'The Power To Do More.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'hp' },
      update: {},
      create: { name: 'HP', slug: 'hp', description: 'Keep Reinventing.' },
    }),
    prisma.brand.upsert({
      where: { slug: 'lenovo' },
      update: {},
      create: {
        name: 'Lenovo',
        slug: 'lenovo',
        description: 'Smarter Technology For All.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'asus' },
      update: {},
      create: {
        name: 'ASUS',
        slug: 'asus',
        description: 'In Search of Incredible.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'bose' },
      update: {},
      create: {
        name: 'Bose',
        slug: 'bose',
        description: 'Better Sound Through Research.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'jbl' },
      update: {},
      create: { name: 'JBL', slug: 'jbl', description: 'Hear what you love.' },
    }),
    prisma.brand.upsert({
      where: { slug: 'logitech' },
      update: {},
      create: {
        name: 'Logitech',
        slug: 'logitech',
        description: 'Design for the Human.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'razer' },
      update: {},
      create: {
        name: 'Razer',
        slug: 'razer',
        description: 'For Gamers. By Gamers.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'microsoft' },
      update: {},
      create: {
        name: 'Microsoft',
        slug: 'microsoft',
        description: 'Empower every person and organization.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'google' },
      update: {},
      create: {
        name: 'Google',
        slug: 'google',
        description: "Organize the world's information.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'anker' },
      update: {},
      create: {
        name: 'Anker',
        slug: 'anker',
        description: 'Empowering Smarter Lives.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'philips' },
      update: {},
      create: {
        name: 'Philips',
        slug: 'philips',
        description: 'Innovation and You.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'canon' },
      update: {},
      create: {
        name: 'Canon',
        slug: 'canon',
        description: 'See What We Mean.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'nikon' },
      update: {},
      create: {
        name: 'Nikon',
        slug: 'nikon',
        description: 'At the heart of the image.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'gopro' },
      update: {},
      create: { name: 'GoPro', slug: 'gopro', description: 'Be a hero.' },
    }),
    prisma.brand.upsert({
      where: { slug: 'xiaomi' },
      update: {},
      create: { name: 'Xiaomi', slug: 'xiaomi', description: 'Just for fans.' },
    }),
  ]);

  console.log(`✓ ${brands.length} brands seeded`);
  return brands;
}
