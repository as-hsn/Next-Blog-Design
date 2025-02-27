import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

     const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "Your email is not registered. Please register first." },
        { status: 400 }
      );
    }

    
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Validity 1 hour

    // Remove old otps for this email
    await pool.query('DELETE FROM "EmailOtp" WHERE email = $1', [email]);

    // Insert new OTP
    await pool.query(
      'INSERT INTO "EmailOtp" (email, otp, "expiresAt", status) VALUES ($1, $2, $3, \'pending\')',
      [email, generatedOtp, expiresAt]
    );

    //  Send email with OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset PIN is: ${generatedOtp}. It expires in 1 hour.\n\nPlease enter the PIN and set your new password here: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2>Password Reset Request</h2>
          <p>Your password reset PIN is: <strong>${generatedOtp}</strong>.</p>
          <p><b>This PIN expires in 1 hour.</b></p>
          <p>Please enter the PIN and set your new password here:</p>
          <p>
            <a href="${resetLink}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">
              Reset Password
            </a>
          </p>
        </div>
      `,
    });
    

    return NextResponse.json(
      { success: true, message: "Password reset PIN sent successfully to your email!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}