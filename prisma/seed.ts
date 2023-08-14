import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { customers } from './seeds/customers';

const prisma = new PrismaClient();

async function main() {
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {},
      create: {
        ...customer,
        password: await bcrypt.hash(customer.password, 10),
      },
    });
  }
  console.log(`Created ${customers.length} customers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
