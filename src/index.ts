import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allFeedbacks = await prisma.feedback.findMany();
  console.log("All feedbacks: ");
  console.dir(allFeedbacks, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
