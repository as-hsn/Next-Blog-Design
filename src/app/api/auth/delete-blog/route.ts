import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");

  if (!blogId) {
    return NextResponse.json(
      { success: false, message: "Blog Not found or deleted" },
      { status: 400 }
    );
  }

  const blogIdNum = parseInt(blogId, 10);
  if (isNaN(blogIdNum)) {
    return NextResponse.json(
      { success: false, message: "Invalid Blog ID Not Found" },
      { status: 400 }
    );
  }

  try {
    await prisma.blog.delete({ where: { id: blogIdNum } });
    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}