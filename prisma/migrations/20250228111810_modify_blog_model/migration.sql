/*
  Warnings:

  - You are about to drop the column `author` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `authorName` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "author",
DROP COLUMN "imgUrl",
ADD COLUMN     "authorImageUrl" TEXT,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "blogImgUrl" TEXT;
