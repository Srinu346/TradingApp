import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const prismaClient = globalThis.prismaGlobal ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prismaClient;
}

export default prismaClient;


