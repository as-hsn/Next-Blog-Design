import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
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
    const title = (formData.get("blogTitle") as string)?.trim();
    const category = formData.get("blogCategory") as string;
    const content = formData.get("blogBody") as string;
    const imageFile = formData.get("blogImage") as File;
    const blogId = formData.get("blogId") as string;

    if (!imageFile && !title && !category && !content) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    if (imageFile.name && imageFile.type) {
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
        const updatedBlog = await prisma.blog.update({
          where: {
            id: Number(blogId),
          },
          data: {
            authorName,
            userId: id,
            category,
            title,
            body: content,
            blogImgUrl,
          },
        });
        if (updatedBlog) {
          return NextResponse.json(
            { success: true, message: "Blog added successfully" },
            { status: 200 }
          );
        }
      }
    } else {
      // Update user data but not generate new image url to cloudinary
      const updatedBlog = await prisma.blog.update({
        where: {
          id: Number(blogId),
        },
        data: {
          authorName,
          userId: id,
          category,
          title,
          body: content,
        },
      });
      if (updatedBlog) {
        return NextResponse.json(
          { success: true, message: "Blog updated successfully" },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      { success: true, message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}
