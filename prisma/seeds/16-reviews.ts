import { PrismaClient, User, Product } from '../../generated/prisma/client';

const REVIEW_DATA = [
  {
    title: 'Absolutely love it!',
    comment:
      'Best purchase I have made in years. The quality is outstanding and it arrived quickly.',
  },
  {
    title: 'Great product, fast delivery',
    comment:
      'Exactly as described. Works perfectly and the build quality is excellent.',
  },
  {
    title: 'Worth every penny',
    comment:
      'Premium quality product. I was hesitant about the price but it is absolutely worth it.',
  },
  {
    title: 'Amazing performance',
    comment:
      'The performance blew me away. Much better than I expected for the price point.',
  },
  {
    title: 'Highly recommended',
    comment:
      'Would definitely buy again. Excellent product and outstanding customer service.',
  },
  {
    title: 'Exceeded expectations',
    comment:
      'I was skeptical at first but this product exceeded all my expectations.',
  },
  {
    title: 'Perfect for my needs',
    comment:
      'This is exactly what I was looking for. Works great and looks amazing.',
  },
  {
    title: 'Very happy with this purchase',
    comment:
      'Great value for money. I have been using it daily with no issues.',
  },
  {
    title: 'Solid build quality',
    comment: 'The build quality feels premium. Everything works as advertised.',
  },
  {
    title: 'Five stars!',
    comment: 'Cannot fault this product. It is exactly what you need and more.',
  },
  {
    title: 'Good product, minor issues',
    comment:
      'Overall a good product. Slight learning curve but once you get used to it, it is great.',
  },
  {
    title: 'Impressive specs',
    comment:
      'The specs match the real-world performance. Very impressed with the results.',
  },
  {
    title: 'Great gift idea',
    comment:
      'Bought this as a gift and the recipient loved it. Will buy more products from this store.',
  },
  {
    title: 'Does the job well',
    comment:
      'Nothing overly fancy but it does what it says on the tin. Good reliable product.',
  },
  {
    title: 'Sleek design',
    comment: 'The design is beautiful and the performance matches the looks.',
  },
  {
    title: 'Best in its class',
    comment:
      'After researching many options, this is the best product in its class.',
  },
  {
    title: 'Fast and reliable',
    comment:
      'Speed and reliability are top-notch. Very satisfied with my purchase.',
  },
  {
    title: 'Seamless setup',
    comment:
      'Setup was a breeze. Was up and running within minutes of unboxing.',
  },
  {
    title: 'Long battery life',
    comment:
      'The battery lasts much longer than the competition. Very impressed.',
  },
  {
    title: 'Premium experience',
    comment:
      'Using this product feels like a premium experience from start to finish.',
  },
];

const RATINGS = [5, 5, 4, 5, 5, 4, 5, 4, 5, 5, 3, 5, 5, 4, 5, 5, 4, 5, 5, 5];

export async function seedReviews(
  prisma: PrismaClient,
  customers: User[],
  products: Product[],
) {
  const data = customers.map((user, i) => ({
    productId: products[i % products.length].id,
    userId: user.id,
    rating: RATINGS[i],
    title: REVIEW_DATA[i].title,
    comment: REVIEW_DATA[i].comment,
    isVerified: i < 15,
    isApproved: i !== 6,
  }));

  await prisma.review.createMany({ data, skipDuplicates: true });
  console.log(`✓ ${data.length} reviews seeded`);
}
