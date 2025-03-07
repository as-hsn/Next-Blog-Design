import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req:NextRequest) {
  try {
    const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
    const token = req.cookies.get("accessToken")?.value as string
     // get login user id
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const { id } = decoded;

    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    let blogs;

    if (id) {
      // Fetch blogs by userId
      blogs = await prisma.blog.findMany({
        where: { userId: String(id) },
      });
    // } else {
    //   // Fetch all blogs
    //   blogs = await prisma.blog.findMany({});
    }

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load blogs data" },
      { status: 500 }
    );
  }
}