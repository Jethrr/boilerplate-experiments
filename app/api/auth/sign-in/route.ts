import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { hash, compare } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  try {
    const { password, email } = await request.json();

    if (!password || !email) {
      return NextResponse.json(
        { message: "Error: All fields are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Error: User not found" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Error: Invalid password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Login Successfully" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error("Error during login:", errorMessage);
    return NextResponse.json(
      { message: "Error: Login failed", error: errorMessage },
      { status: 500 }
    );
  }
}
