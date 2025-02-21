import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    const { name, email, password,otp } = await req.json();

    // Extra Checking for fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Checking if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered. Please Login" },
        { status: 400 }
      );
    }

    // if (!otp) {
    //   // Generate OTP
    //   const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    //   return NextResponse.json(
    //     { success: 'pending', message: "An OTP has been sent to your email. Please verify your email to complete registration." },
    //     { status: 400 }
    //   );
      
    // }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in PostgreSQL Database
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    if (newUser) {
      // Generate Token
      const token = jwt.sign({ email }, process.env.SECRET_KEY_JWT as string, { expiresIn: "7d" });


      // Set Cookie
      const cookie = serialize("token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      const response = NextResponse.json({
        success: true,
        message: "You're now logged in.",
        newUser,
      });
      response.headers.set("Set-Cookie", cookie);
      return response;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}
