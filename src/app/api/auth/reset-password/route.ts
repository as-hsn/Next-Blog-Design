"use server";

import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Check if OTP is valid and not expired
    const result = await pool.query(
      'SELECT * FROM "EmailOtp" WHERE email = $1 AND otp = $2 AND "expiresAt" > NOW() AND status = \'pending\'',
      [email, otp]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP" }, { status: 400 });
    }

    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await pool.query('UPDATE "User" SET password = $1 WHERE email = $2', [hashedPassword, email]);

    // Mark OTP as used
    await pool.query('UPDATE "EmailOtp" SET status = \'verified\' WHERE email = $1', [email]);

    return NextResponse.json({ success: true, message: "Password updated successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}