import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import nodemailer from "nodemailer";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    //  If OTP is recieved : Verify OTP
    if (otp) {
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

      // Mark OTP as used
      await pool.query(
        "UPDATE \"EmailOtp\" SET status = 'verified' WHERE email = $1",
        [email]
      );

      return NextResponse.json(
        { success: true, message: "OTP verified successfully!" },
        { status: 200 }
      );
    }

    // If no otp recieved generate new otp
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 4 * 60 * 1000); // Validity 4 minutes

    // Remove old otps for this email
    await pool.query('DELETE FROM "EmailOtp" WHERE email = $1', [email]);

    // Insert new otp
    await pool.query(
      'INSERT INTO "EmailOtp" (email, otp, "expiresAt", status) VALUES ($1, $2, $3, \'pending\')',
      [email, generatedOtp, expiresAt]
    );

    //  Send email with otp
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your email verification OTP is: ${generatedOtp}. It will expire in 4 minutes. \n Please enter this OTP on the registration page.`,
    });

    return NextResponse.json(
      { success: true, message: "OTP sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
