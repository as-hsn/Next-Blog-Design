-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imgUrl" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
