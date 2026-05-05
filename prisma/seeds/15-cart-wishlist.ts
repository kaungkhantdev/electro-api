import { PrismaClient, User, Product } from '../../generated/prisma/client';

export async function seedCartAndWishlist(
  prisma: PrismaClient,
  customers: User[],
  products: Product[],
) {
  const cartData = customers.map((user, i) => ({
    userId: user.id,
    productId: products[(i * 3) % products.length].id,
    quantity: (i % 3) + 1,
  }));

  await prisma.cartItem.createMany({ data: cartData, skipDuplicates: true });
  console.log(`✓ ${cartData.length} cart items seeded`);

  const wishlistData = customers.map((user, i) => ({
    userId: user.id,
    productId: products[(i * 2 + 1) % products.length].id,
  }));

  await prisma.wishlistItem.createMany({
    data: wishlistData,
    skipDuplicates: true,
  });
  console.log(`✓ ${wishlistData.length} wishlist items seeded`);
}
