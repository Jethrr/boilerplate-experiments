import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { hash, compare } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "Error: All fields are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Registered Successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Error: Registration failed", error: error },
      { status: 500 }
    );
  }
}
