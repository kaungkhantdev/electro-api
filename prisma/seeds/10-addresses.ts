import { PrismaClient, User } from '../../generated/prisma/client';

const STATES = [
  'CA',
  'NY',
  'TX',
  'FL',
  'WA',
  'IL',
  'PA',
  'OH',
  'GA',
  'AZ',
  'NC',
  'MI',
  'NJ',
  'VA',
  'CO',
  'TN',
  'IN',
  'MO',
  'WI',
  'MN',
];
const CITIES = [
  'Los Angeles',
  'New York',
  'Houston',
  'Miami',
  'Seattle',
  'Chicago',
  'Philadelphia',
  'Columbus',
  'Atlanta',
  'Phoenix',
  'Charlotte',
  'Detroit',
  'Newark',
  'Richmond',
  'Denver',
  'Nashville',
  'Indianapolis',
  'Kansas City',
  'Milwaukee',
  'Minneapolis',
];

export async function seedAddresses(prisma: PrismaClient, customers: User[]) {
  const addresses = await Promise.all(
    customers.map((user, i) =>
      prisma.address.upsert({
        where: { id: `addr-${user.id}-primary` },
        update: {},
        create: {
          id: `addr-${user.id}-primary`,
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          address1: `${1000 + i * 11} Main Street`,
          city: CITIES[i % CITIES.length],
          state: STATES[i % STATES.length],
          zipCode: `${90000 + i * 137}`,
          country: 'US',
          phone: `+1-${200 + i}-555-${String(1000 + i).padStart(4, '0')}`,
          isDefault: true,
          type: 'BOTH',
        },
      }),
    ),
  );

  console.log(`✓ ${addresses.length} addresses seeded`);
  return addresses;
}
