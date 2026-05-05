import { PrismaClient, Product, Tag } from '../../generated/prisma/client';

export async function seedProductTags(
  prisma: PrismaClient,
  products: Product[],
  tags: Tag[],
) {
  // [productIndex, tagIndex]
  const pairs: [number, number][] = [
    [0, 0],
    [0, 12],
    [0, 17], // iPhone 15 Pro: New Arrival, AI-Powered, 5G
    [1, 1],
    [1, 12],
    [1, 17], // Galaxy S24 Ultra: Best Seller, AI-Powered, 5G
    [2, 3],
    [2, 7], // Sony WH-1000XM5: Wireless, Noise Cancelling
    [3, 16],
    [3, 11], // MacBook Pro: Premium, OLED
    [4, 11],
    [4, 16], // Dell XPS 15: OLED, Premium
    [5, 3],
    [5, 10], // MX Master 3S: Wireless, USB-C
    [6, 6],
    [6, 4], // BlackWidow V4: Gaming, Bluetooth
    [7, 3],
    [7, 7], // AirPods Pro 2: Wireless, Noise Cancelling
    [8, 5],
    [8, 19], // Samsung TV: 4K, Smart
    [9, 0],
    [9, 16], // Canon R6 II: New Arrival, Premium
    [10, 8],
    [10, 0], // GoPro Hero 12: Waterproof, New Arrival
    [11, 10],
    [11, 9], // Anker charger: USB-C, Fast Charging
    [12, 3],
    [12, 8], // JBL Charge 5: Wireless, Waterproof
    [13, 12],
    [13, 17], // Pixel 8 Pro: AI-Powered, 5G
    [14, 16],
    [14, 3], // ThinkPad: Premium, Wireless
    [15, 6],
    [15, 11], // ROG Zephyrus: Gaming, OLED
    [16, 2],
    [16, 17], // Redmi Note 13: Sale, 5G
    [17, 3],
    [17, 4], // Galaxy Buds3: Wireless, Bluetooth
    [18, 19],
    [18, 10], // Surface Pro 9: Smart, USB-C
    [19, 11],
    [19, 16], // HP Spectre: OLED, Premium
  ];

  await prisma.productTag.createMany({
    data: pairs.map(([pi, ti]) => ({
      productId: products[pi].id,
      tagId: tags[ti].id,
    })),
    skipDuplicates: true,
  });

  console.log(`✓ ${pairs.length} product tags seeded`);
}
