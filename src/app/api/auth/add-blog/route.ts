import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
  const token = req.cookies.get("accessToken")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  // get login user name
  const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
  const { id } = decoded;
  const findUser = await prisma.user.findUnique({ where: { id } });

  try {
    const formData = await req.formData();
    const authorName = findUser?.name as string;
    const authorImageUrl = findUser?.image as string;
    const title = (formData.get("blogTitle") as string)?.trim();
    const category = formData.get("blogCategory") as string;
    const content = formData.get("blogBody") as string;
    const imageFile = formData.get("blogImage") as File;

    if (!imageFile && !title && !category && !content) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }
    // Image upload to cloudinary code starts
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64Image = `data:${imageFile.type};base64,${buffer.toString(
      "base64"
    )}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "nextjs_uploads",
    });
    // Image upload to cloudinary code ends
    if (uploadResponse.secure_url) {
      const blogImgUrl = uploadResponse.secure_url;
      // Save the user in the PostgreSQL database
      const addBlog = await prisma.blog.create({
        data: {
          authorName,
          userId: id,
          category,
          title,
          body: content,
          blogImgUrl,
          authorImageUrl
        },
      });
      if (addBlog) {
        return NextResponse.json(
          { success: true, message: "Blog added successfully" },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      { success: true, message: "Blog added successfully" },
      { status: 200 }
    );
  } catch (error) {
    void error
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}