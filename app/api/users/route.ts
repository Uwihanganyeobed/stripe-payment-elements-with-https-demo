import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error storing user:", error);
    return NextResponse.json(
      { error: "Failed to store user" },
      { status: 500 }
    );
  }
}
