import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  
  try {
    // Get unique userIds from Blog table
    const uniqueUserIds = await prisma.blog.findMany({
      select: { userId: true }, // Only select userId
      distinct: ["userId"], // Ensure uniqueness
    });

    // Extract userId values into an array
    const userIds = uniqueUserIds.map((item) => item.userId);

    // Fetch users in a single query using 'in' condition and include blog count
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      include: {
        _count: {
          select: { blogs: true }, // Count number of blogs for each user
        },
      },
    });

    // Format the response to include author details and blog count
    const authors = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      image:user.image,
      blogCount: user._count.blogs, // Number of blogs written by this user
    }));

    return NextResponse.json({ success: true, authors });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(req:NextRequest){

  try {
    const {authorId} = await req.json()
    // Find Author in blog table 
    const blogs = await prisma.blog.findMany({
      where: { userId: authorId },
    });

    // Find Author in user table
    const user = await prisma.user.findUnique({
      where: { id: authorId },
      
      include: {
        _count: {
          select: { blogs: true }, 
        },
      }},)

    if (user) {
      
    }
      return NextResponse.json(
        { success: true, user,blogs },
        { status: 500 })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 })
  }
}