import { PrismaClient, Product } from '../../generated/prisma/client';

export async function seedProductVariants(
  prisma: PrismaClient,
  products: Product[],
) {
  const variantDefs = [
    {
      productId: products[0].id,
      name: 'iPhone 15 Pro – Natural Titanium 256GB',
      sku: 'APPL-IP15P-NT256',
      price: 999.99,
      stock: 50,
      options: [
        { optionName: 'Color', optionValue: 'Natural Titanium' },
        { optionName: 'Storage', optionValue: '256GB' },
      ],
    },
    {
      productId: products[0].id,
      name: 'iPhone 15 Pro – Black Titanium 512GB',
      sku: 'APPL-IP15P-BT512',
      price: 1199.99,
      stock: 40,
      options: [
        { optionName: 'Color', optionValue: 'Black Titanium' },
        { optionName: 'Storage', optionValue: '512GB' },
      ],
    },
    {
      productId: products[1].id,
      name: 'Galaxy S24 Ultra – Titanium Black 256GB',
      sku: 'SAMS-S24U-TB256',
      price: 1199.99,
      stock: 60,
      options: [
        { optionName: 'Color', optionValue: 'Titanium Black' },
        { optionName: 'Storage', optionValue: '256GB' },
      ],
    },
    {
      productId: products[1].id,
      name: 'Galaxy S24 Ultra – Titanium Gray 512GB',
      sku: 'SAMS-S24U-TG512',
      price: 1379.99,
      stock: 30,
      options: [
        { optionName: 'Color', optionValue: 'Titanium Gray' },
        { optionName: 'Storage', optionValue: '512GB' },
      ],
    },
    {
      productId: products[2].id,
      name: 'WH-1000XM5 – Black',
      sku: 'SONY-WH5-BLK',
      price: 349.99,
      stock: 100,
      options: [{ optionName: 'Color', optionValue: 'Black' }],
    },
    {
      productId: products[2].id,
      name: 'WH-1000XM5 – Silver',
      sku: 'SONY-WH5-SLV',
      price: 349.99,
      stock: 100,
      options: [{ optionName: 'Color', optionValue: 'Silver' }],
    },
    {
      productId: products[3].id,
      name: 'MacBook Pro 16" M3 Pro – Space Black 512GB',
      sku: 'APPL-MBP16-SB512',
      price: 2499.99,
      stock: 30,
      options: [
        { optionName: 'Color', optionValue: 'Space Black' },
        { optionName: 'Storage', optionValue: '512GB' },
      ],
    },
    {
      productId: products[3].id,
      name: 'MacBook Pro 16" M3 Pro – Silver 1TB',
      sku: 'APPL-MBP16-SV1TB',
      price: 2699.99,
      stock: 20,
      options: [
        { optionName: 'Color', optionValue: 'Silver' },
        { optionName: 'Storage', optionValue: '1TB' },
      ],
    },
    {
      productId: products[7].id,
      name: 'AirPods Pro 2 – White',
      sku: 'APPL-APP2-WHT',
      price: 249.99,
      stock: 150,
      options: [{ optionName: 'Color', optionValue: 'White' }],
    },
    {
      productId: products[8].id,
      name: 'Samsung 55" QLED – Titan Gray',
      sku: 'SAMS-TV55-TG',
      price: 899.99,
      stock: 25,
      options: [{ optionName: 'Color', optionValue: 'Titan Gray' }],
    },
    {
      productId: products[13].id,
      name: 'Google Pixel 8 Pro – Obsidian 128GB',
      sku: 'GOOG-P8P-OB128',
      price: 999.99,
      stock: 50,
      options: [
        { optionName: 'Color', optionValue: 'Obsidian' },
        { optionName: 'Storage', optionValue: '128GB' },
      ],
    },
    {
      productId: products[13].id,
      name: 'Google Pixel 8 Pro – Porcelain 256GB',
      sku: 'GOOG-P8P-PC256',
      price: 1059.99,
      stock: 30,
      options: [
        { optionName: 'Color', optionValue: 'Porcelain' },
        { optionName: 'Storage', optionValue: '256GB' },
      ],
    },
    {
      productId: products[16].id,
      name: 'Redmi Note 13 Pro – Midnight Black 256GB',
      sku: 'XIAO-RN13P-BK256',
      price: 349.99,
      stock: 150,
      options: [
        { optionName: 'Color', optionValue: 'Midnight Black' },
        { optionName: 'Storage', optionValue: '256GB' },
      ],
    },
    {
      productId: products[16].id,
      name: 'Redmi Note 13 Pro – Arctic White 128GB',
      sku: 'XIAO-RN13P-WH128',
      price: 299.99,
      stock: 100,
      options: [
        { optionName: 'Color', optionValue: 'Arctic White' },
        { optionName: 'Storage', optionValue: '128GB' },
      ],
    },
    {
      productId: products[6].id,
      name: 'BlackWidow V4 Pro – Black',
      sku: 'RAZR-BWV4-BLK',
      price: 229.99,
      stock: 75,
      options: [{ optionName: 'Color', optionValue: 'Black' }],
    },
    {
      productId: products[4].id,
      name: 'Dell XPS 15 – Platinum Silver',
      sku: 'DELL-XPS15-PS',
      price: 1999.99,
      stock: 30,
      options: [{ optionName: 'Color', optionValue: 'Platinum Silver' }],
    },
    {
      productId: products[4].id,
      name: 'Dell XPS 15 – Graphite',
      sku: 'DELL-XPS15-GR',
      price: 2099.99,
      stock: 20,
      options: [{ optionName: 'Color', optionValue: 'Graphite' }],
    },
    {
      productId: products[17].id,
      name: 'Galaxy Buds3 Pro – White',
      sku: 'SAMS-GB3P-WHT',
      price: 229.99,
      stock: 110,
      options: [{ optionName: 'Color', optionValue: 'White' }],
    },
    {
      productId: products[17].id,
      name: 'Galaxy Buds3 Pro – Silver',
      sku: 'SAMS-GB3P-SLV',
      price: 229.99,
      stock: 80,
      options: [{ optionName: 'Color', optionValue: 'Silver' }],
    },
    {
      productId: products[14].id,
      name: 'ThinkPad X1 Carbon – 16GB 512GB',
      sku: 'LENO-X1C11-16512',
      price: 1749.99,
      stock: 35,
      options: [
        { optionName: 'RAM', optionValue: '16GB' },
        { optionName: 'Storage', optionValue: '512GB' },
      ],
    },
  ];

  for (const { options, ...variantData } of variantDefs) {
    const existing = await prisma.productVariant.findUnique({
      where: { sku: variantData.sku },
    });
    if (!existing) {
      await prisma.productVariant.create({
        data: { ...variantData, options: { create: options } },
      });
    }
  }

  console.log(`✓ ${variantDefs.length} product variants seeded`);
}
