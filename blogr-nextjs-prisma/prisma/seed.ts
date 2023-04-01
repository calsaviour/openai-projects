// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { posts } from "../data/posts";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.create({
    data: {
      name: "Test User",
      email: `testemail@gmail.com`,
    },
  });
  const user = prisma.user.findFirst();
  await prisma.post.createMany({
    data: posts
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
