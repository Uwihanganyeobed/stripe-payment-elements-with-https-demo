// api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16" as any, // Use 'as any' to bypass type checking
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}