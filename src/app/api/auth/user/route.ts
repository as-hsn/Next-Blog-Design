import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req:NextRequest) {
  const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
  const token = req.cookies.get("accessToken")?.value;  
  if (!token) return NextResponse.json({success:false,message:'user is not logged in'});
  try {
  // get login user name
  const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
  const { id } = decoded;
  const findUser = await prisma.user.findUnique({ where: { id } });
  
    return NextResponse.json({ success: true, user:findUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, message: "Invalid token or internal error" }, { status: 500 });
  }
}