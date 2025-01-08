import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request, response: Response) {
    try {
        const {amount}= await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: {enabled: true},
        });
        return NextResponse.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        console.error("Internal error", error);
    return NextResponse.json({
        error: `Internal error: ${error}`
    },
{status: 500,})
    }
}