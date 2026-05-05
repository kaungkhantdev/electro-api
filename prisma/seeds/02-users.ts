import { PrismaClient } from '../../generated/prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'superadmin@electro.com' },
      update: {},
      create: {
        email: 'superadmin@electro.com',
        username: 'superadmin',
        password: passwordHash,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'SUPER_ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'admin@electro.com' },
      update: {},
      create: {
        email: 'admin@electro.com',
        username: 'admin_electro',
        password: passwordHash,
        firstName: 'Alice',
        lastName: 'Admin',
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'admin2@electro.com' },
      update: {},
      create: {
        email: 'admin2@electro.com',
        username: 'admin_bob',
        password: passwordHash,
        firstName: 'Bob',
        lastName: 'Manager',
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: passwordHash,
        firstName: 'John',
        lastName: 'Doe',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        email: 'jane.smith@example.com',
        username: 'janesmith',
        password: passwordHash,
        firstName: 'Jane',
        lastName: 'Smith',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike.wilson@example.com' },
      update: {},
      create: {
        email: 'mike.wilson@example.com',
        username: 'mikewilson',
        password: passwordHash,
        firstName: 'Mike',
        lastName: 'Wilson',
      },
    }),
    prisma.user.upsert({
      where: { email: 'emily.jones@example.com' },
      update: {},
      create: {
        email: 'emily.jones@example.com',
        username: 'emilyjones',
        password: passwordHash,
        firstName: 'Emily',
        lastName: 'Jones',
      },
    }),
    prisma.user.upsert({
      where: { email: 'david.brown@example.com' },
      update: {},
      create: {
        email: 'david.brown@example.com',
        username: 'davidbrown',
        password: passwordHash,
        firstName: 'David',
        lastName: 'Brown',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sara.davis@example.com' },
      update: {},
      create: {
        email: 'sara.davis@example.com',
        username: 'saradavis',
        password: passwordHash,
        firstName: 'Sara',
        lastName: 'Davis',
      },
    }),
    prisma.user.upsert({
      where: { email: 'chris.martin@example.com' },
      update: {},
      create: {
        email: 'chris.martin@example.com',
        username: 'chrismartin',
        password: passwordHash,
        firstName: 'Chris',
        lastName: 'Martin',
      },
    }),
    prisma.user.upsert({
      where: { email: 'laura.taylor@example.com' },
      update: {},
      create: {
        email: 'laura.taylor@example.com',
        username: 'laurataylor',
        password: passwordHash,
        firstName: 'Laura',
        lastName: 'Taylor',
      },
    }),
    prisma.user.upsert({
      where: { email: 'james.anderson@example.com' },
      update: {},
      create: {
        email: 'james.anderson@example.com',
        username: 'jamesanderson',
        password: passwordHash,
        firstName: 'James',
        lastName: 'Anderson',
      },
    }),
    prisma.user.upsert({
      where: { email: 'olivia.thomas@example.com' },
      update: {},
      create: {
        email: 'olivia.thomas@example.com',
        username: 'oliviathomas',
        password: passwordHash,
        firstName: 'Olivia',
        lastName: 'Thomas',
      },
    }),
    prisma.user.upsert({
      where: { email: 'ethan.jackson@example.com' },
      update: {},
      create: {
        email: 'ethan.jackson@example.com',
        username: 'ethanjackson',
        password: passwordHash,
        firstName: 'Ethan',
        lastName: 'Jackson',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sophia.white@example.com' },
      update: {},
      create: {
        email: 'sophia.white@example.com',
        username: 'sophiawhite',
        password: passwordHash,
        firstName: 'Sophia',
        lastName: 'White',
      },
    }),
    prisma.user.upsert({
      where: { email: 'noah.harris@example.com' },
      update: {},
      create: {
        email: 'noah.harris@example.com',
        username: 'noahharris',
        password: passwordHash,
        firstName: 'Noah',
        lastName: 'Harris',
      },
    }),
    prisma.user.upsert({
      where: { email: 'ava.clark@example.com' },
      update: {},
      create: {
        email: 'ava.clark@example.com',
        username: 'avaclark',
        password: passwordHash,
        firstName: 'Ava',
        lastName: 'Clark',
      },
    }),
    prisma.user.upsert({
      where: { email: 'liam.lewis@example.com' },
      update: {},
      create: {
        email: 'liam.lewis@example.com',
        username: 'liamlewis',
        password: passwordHash,
        firstName: 'Liam',
        lastName: 'Lewis',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mia.walker@example.com' },
      update: {},
      create: {
        email: 'mia.walker@example.com',
        username: 'miawalker',
        password: passwordHash,
        firstName: 'Mia',
        lastName: 'Walker',
      },
    }),
    prisma.user.upsert({
      where: { email: 'lucas.hall@example.com' },
      update: {},
      create: {
        email: 'lucas.hall@example.com',
        username: 'lucashall',
        password: passwordHash,
        firstName: 'Lucas',
        lastName: 'Hall',
      },
    }),
  ]);

  console.log(`✓ ${users.length} users seeded`);
  return users;
}
