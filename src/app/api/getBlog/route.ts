import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug"); 
    
    if (slug) {
      const blog = await prisma.blog.findFirst({
        where: { title: slug },
      });

      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, blog }, { status: 200 });
    }

    // Default: Fetch all blogs if no slug is provided
    const blogs = await prisma.blog.findMany();
    return NextResponse.json({ success: true, blogs }, { status: 200 });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load blogs data" },
      { status: 500 }
    );
  }
}