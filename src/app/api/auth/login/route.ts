import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }

    const newUser = {
      id: user.id,
      email: user.email,
    };

    //  Generate JWT Token
    const accessToken = generateAccessToken(newUser);
    const refreshToken = await generateRefreshToken(newUser);

    const response = NextResponse.json(
      { success: true, message: "You are now logged in", accessToken },
      { status: 200 }
    );

    // Store Access Token in Cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: false, // Prevent client-side access
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 20 * 60 * 1000, // 1 day expiration time
    });

    // Store Refresh Token in Cookies
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days expiry
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
