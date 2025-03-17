import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Get JWT Token from Cookies
    const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "You must log in first to add a comment" },
        { status: 401 }
      );
    }

    // Verify Token & Extract User ID
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    const { id: userId } = decoded; 

    // Parse request body
    const { comment, blogId } = await req.json();

    if (!comment || !blogId) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Get userName from userId
    const getUser = await prisma.user.findFirst({
      where: { id: userId },
      select: { name: true },
    });

    if (!getUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Add comment to database
    const addComment = await prisma.comment.create({
      data: {
        blogId,
        userId,
        userName: getUser.name, 
        content: comment.text, 
      },
    });

    if (addComment) {
      return NextResponse.json(
        { success: true, message: "Comment added successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "An error occurred while adding comment" }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in add comment API:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}