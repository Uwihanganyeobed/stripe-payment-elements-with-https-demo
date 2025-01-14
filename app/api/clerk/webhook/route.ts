import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const clerkEvent = req.headers.get("x-clerk-event");
  const body = await req.json();

  if (clerkEvent === "user.created") {
    const { id, email_addresses, first_name } = body;

    try {
      const email = email_addresses[0]?.email_address;
      if (!email) throw new Error("Email is missing");

      await prisma.user.create({
        data: {
          email,
          name: first_name || null,
        },
      });

      return NextResponse.json({ message: "User stored successfully" }, { status: 201 });
    } catch (error) {
      console.error("Error storing user:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Unhandled event type" }, { status: 400 });
}
