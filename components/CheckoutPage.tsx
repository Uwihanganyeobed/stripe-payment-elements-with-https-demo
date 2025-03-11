"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrecy";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      setErrorMessage("Failed to initialize payment");
    }
    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!clientSecret) {
      await createPaymentIntent();
    }

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-complete?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      {!clientSecret ? (
        <button
          onClick={createPaymentIntent}
          disabled={loading}
          className="text-white w-full p-5 bg-black mb-4 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {loading ? "Initializing..." : "Start Payment"}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
          <PaymentElement />
          {errorMessage && (
            <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
          )}
          <button
            disabled={!stripe || loading}
            className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
          >
            {!loading ? `Pay $${amount}` : "Processing..."}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
