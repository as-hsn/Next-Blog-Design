import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData(); 
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const Gender = formData.get("Gender") as string;
    const Birthdate = formData.get("Birthdate") as string;
    const imageFile = formData.get("image") as File;

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    // Fetch existing user data to check if the image has changed
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { image: true }, 
    });

    let imageUrl = existingUser?.image; 

    if (imageFile && imageFile instanceof Blob) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
              folder: "nextjs_uploads",
            });

        if (uploadResponse.secure_url) {
          imageUrl = uploadResponse.secure_url; 
        }
      } catch (error) {
        void error
        return NextResponse.json({ success: false, error: "Image upload failed" }, { status: 500 });
      }
    }

    // Update the user with new data (only updating necessary fields)
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, phone, address, Gender, Birthdate, image: imageUrl },
    });

    return NextResponse.json({ success: true, message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    void error
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}