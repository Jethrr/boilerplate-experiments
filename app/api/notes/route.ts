import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: NextRequest) {
  // Parse the request body as JSON

  const { task, description } = await request.json();
}
