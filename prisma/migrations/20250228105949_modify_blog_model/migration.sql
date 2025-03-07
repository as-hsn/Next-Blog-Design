/*
  Warnings:

  - Added the required column `userId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "userId" TEXT NOT NULL;
