import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { commentId, userId } = await req.json();

    // Fetch the comment details
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, blogId: true },
    });

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    // Fetch the blog details to get the author's ID
    const blog = await prisma.blog.findUnique({
      where: { id: comment.blogId },
      select: { userId: true }, // Fetch only the blog author's ID
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Check if the user is either the comment owner or the blog author
    const isCommentOwner = comment.userId === userId;
    const isBlogAuthor = blog.userId === userId;

    if (!isCommentOwner && !isBlogAuthor) {
      return NextResponse.json(
        { success: false, message: "Unauthorized to delete this comment" },
        { status: 403 }
      );
    }

    // Proceed with deletion if the user is authorized
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({
      success: true,
      message: "Comment has been deleted",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}