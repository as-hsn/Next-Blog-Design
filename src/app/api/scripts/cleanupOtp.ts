// This file currently not in use

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import cron from "node-cron";

// // Runs every 5 minutes to delete expired OTPs
// cron.schedule("*/5 * * * *", async () => {
//   console.log("Cleaning up expired OTPs...");
//   await prisma.emailOtp.deleteMany({ where: { expiresAt: { lt: new Date() } } });
// });