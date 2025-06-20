// lib/prisma.ts


// output   = "../src/generated/prisma"
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../../generated/prisma";


const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { PrismaClient } from "@prisma/client";
//
// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };
//
// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }
//
// const prisma = globalThis.prisma ?? prismaClientSingleton();
//
// export default prisma;
//
// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;



