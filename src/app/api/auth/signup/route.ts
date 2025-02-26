import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";
import { generateAccessToken,generateRefreshToken } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, otp } = await req.json();

    // All fields required
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    //  Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered. Please Login" },
        { status: 400 }
      );
    }

    // If OTP is provided : Verify OTP
    if (otp) {
      const otpResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        return NextResponse.json(
          { message: otpData?.message || "Invalid or expired OTP" },
          { status: otpResponse.status }
        );
      }
    }
    // If OTP is not provided : Send email for OTP
    else {
      const sendOtpResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const sendOtpData = await sendOtpResponse.json();

      if (!sendOtpResponse.ok) {
        return NextResponse.json(
          { error: sendOtpData?.error || "Failed to send OTP" },
          { status: sendOtpResponse.status }
        );
      }

      return NextResponse.json(
        { success: "pending", message: "An OTP has been sent to your email" },
        { status: 200 }
      );
    }

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user in the PostgreSQL database
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    //  Generate JWT Token
    const accessToken = generateAccessToken(newUser);
    const refreshToken = await  generateRefreshToken(newUser);

  
    const response = NextResponse.json({ success:true,message: "You are now logged in" ,accessToken }, { status: 200 });

          // Store Access Token in Cookies
      response.cookies.set("accessToken", accessToken, {
        httpOnly: false, // Prevent client-side access
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 20 * 60 * 1000, // 1 day expiration time
      });

      // Store Refresh Token in Cookies
      response.cookies.set("refreshToken",  refreshToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days expiry
      });


    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    console.log("error is", error);
    return NextResponse.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}
