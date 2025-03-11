// app/page.tsx
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/components/CheckoutPage";
import { useState } from "react";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPayment(true);
  };

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Make a Stunning Stripe Payment</h1>
        {!showPayment ? (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-3 pl-8 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={amount <= 0}
                className="bg-black text-white p-3 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl">
              Amount to pay: <span className="font-bold">${amount.toFixed(2)}</span>
            </h2>
            <button 
              onClick={() => setShowPayment(false)}
              className="mt-2 text-sm underline hover:text-gray-200"
            >
              Change amount
            </button>
          </>
        )}
      </div>

      {showPayment && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: amount * 100,
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      )}
    </main>
  );
}
