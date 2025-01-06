import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

interface user {
  username: string;
  password: string;
}

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: NextRequest) {
  // Parse the request body as JSON
  const { password, email } = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json({
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error" });
  }
}
