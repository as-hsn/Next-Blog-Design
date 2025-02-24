import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Check otp and new password and then verify this details
    if (otp && newPassword) {
      const result = await pool.query(
        'SELECT * FROM "EmailOtp" WHERE email = $1 AND otp = $2 AND "expiresAt" > NOW() AND status = \'pending\'',
        [email, otp]
      );

      if (result.rowCount === 0) {
        return NextResponse.json(
          { success: false, message: "Invalid or expired OTP" },
          { status: 400 }
        );
      }

      // Hashing new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      await pool.query('UPDATE "Users" SET password = $1 WHERE email = $2', [
        hashedPassword,
        email,
      ]);

      // Mark OTP as used
      await pool.query(
        "UPDATE \"EmailOtp\" SET status = 'verified' WHERE email = $1",
        [email]
      );

      return NextResponse.json(
        { success: true, message: "Password reset successfully!" },
        { status: 200 }
      );
    }

    // If only email is received then make otp and send it
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
      { success: true, message: "Password reset PIN sent successfully!" },
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