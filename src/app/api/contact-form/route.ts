import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
  try {
    const {name,email,issue,message} = await req.json()
  if (!name || !email || !issue || !message) {
    return NextResponse.json({success:false,message:"All fields required"})
  }

  // Add entry to contact form database table
  const addDetails = await prisma.contactForm.create({
    data: {
      userName:name,
      userEmail:email,
      issue,
      message
    }
  })
  if (addDetails) {
    return NextResponse.json({success:true,message:"Thank you! Your message has been received, and we'll respond shortly"})
  }
  } catch (error:unknown) {
    console.error((error as Error).message)
    return NextResponse.json({success:true,message:"Internal server error"})
  }
}