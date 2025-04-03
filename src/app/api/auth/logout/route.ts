import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Adjust based on your Prisma setup

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 });
    }

    // Verify the token using the backend secret
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    // Remove refreshToken from the database
    await prisma.user.update({
      where: { id: decoded.id },
      data: { refreshToken: null },
    });
    return NextResponse.json({ success: true, message: "You have been logged out" });
  } catch (error) {
    void error
    return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
  }
}