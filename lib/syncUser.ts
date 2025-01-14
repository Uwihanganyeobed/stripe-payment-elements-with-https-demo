import { currentUser } from "@clerk/nextjs";
import { prisma } from "./prisma";

export async function syncUserWithDatabase() {
  const user = await currentUser();

  if (user) {
    const email = user.emailAddresses[0]?.emailAddress || null;
    const name = user.firstName || user.username || null;

    if (email) {
      await prisma.user.upsert({
        where: { email },
        update: { name },
        create: {
          email,
          name,
        },
      });
    }
  }
}
