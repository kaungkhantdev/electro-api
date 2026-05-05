import { PrismaClient, Product } from '../../generated/prisma/client';

export async function seedProductImages(
  prisma: PrismaClient,
  products: Product[],
) {
  const data = products.flatMap((p, i) => [
    {
      productId: p.id,
      url: `https://cdn.electro.com/products/${p.slug}/main.jpg`,
      alt: p.name,
      position: 0,
    },
    {
      productId: p.id,
      url: `https://cdn.electro.com/products/${p.slug}/side.jpg`,
      alt: `${p.name} side view`,
      position: 1,
    },
    ...(i % 2 === 0
      ? [
          {
            productId: p.id,
            url: `https://cdn.electro.com/products/${p.slug}/detail.jpg`,
            alt: `${p.name} detail`,
            position: 2,
          },
        ]
      : []),
  ]);

  await prisma.productImage.createMany({ data, skipDuplicates: true });
  console.log(`✓ ${data.length} product images seeded`);
}
