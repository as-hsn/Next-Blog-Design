import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

interface User {
  id: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;


// Generate Access Token
export const generateAccessToken = (user: User) => {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};


// Generate and Save Refresh Token
export const generateRefreshToken = async (user: User) => {
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    // Save refreshToken to the database
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    return refreshToken;
};



// Middleware to Check Access Token
export const verifyAccessToken = (req: Request) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.log("🚀 ~ verifyAccessToken ~ error:", error)
        return null;
    }
};


// Middleware to Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
      console.log("🚀 ~ verifyRefreshToken ~ error:", error)
        return null;
    }
};