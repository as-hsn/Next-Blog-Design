import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract query params
    let dataPerPage;
    const searchParams = req.nextUrl.searchParams;
    const pageNumber = parseInt(searchParams.get("page") || "1", 10);
    const category = searchParams.get("category");
    dataPerPage = Number(searchParams.get("dataPerPage"));
    if (!dataPerPage) {
      dataPerPage = Number(process.env.BLOGS_PER_PAGE);
    }
    const offset = (pageNumber - 1) * dataPerPage;
    let totalBlogs;
    let blogs;

    if (category) {
      // Fetch total number of blogs based on category
      totalBlogs = await prisma.blog.count({ where: { category } });

      // Fetch paginated blogs based on category
      blogs = await prisma.blog.findMany({
        where: { category },
        skip: offset,
        take: dataPerPage,
      });
    } else {
      // Fetch total number of blogs
      totalBlogs = await prisma.blog.count();

      // Fetch paginated blogs
      blogs = await prisma.blog.findMany({
        skip: offset,
        take: dataPerPage,
      });
    }
    return NextResponse.json(
      { success: true, blogs, totalBlogsCount: totalBlogs },
      { status: 200 }
    );
  } catch (error) {
    void error
    return NextResponse.json(
      { success: false, message: "Failed to load blogs data" },
      { status: 500 }
    );
  }
}
