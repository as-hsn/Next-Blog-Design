import { NextRequest, NextResponse } from "next/server";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const getRefreshToken = req.cookies.get("refreshToken")?.value;
//   console.log("🚀 ~ GET ~ refreshToken:", getRefreshToken);

  try {
    if (!getRefreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshToken(getRefreshToken);

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh token" },
        { status: 403 }
      );
    }

    // Ensure decoded is a User object
    const user = decoded as User;

    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    // console.log("🚀 ~ GET ~ findUser:", findUser);

    if (!findUser || findUser.refreshToken !== getRefreshToken) {
      throw new Error("Invalid refresh token or user not found");
    }

    // Generate new access & refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    console.log("New Tokens:", accessToken, "Refresh:", refreshToken);

    // **Update refresh token in the database**
    await prisma.user.update({
      where: { email: user.email },
      data: { refreshToken },
    });

    // Create a response object
    const response = NextResponse.json(
      { success: true, accessToken,refreshToken },
      { status: 200 }
    );

    

    // console.log(" Cookies updated successfully");

    return response;
  } catch (error) {
    console.error("Error in refreshing token:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}