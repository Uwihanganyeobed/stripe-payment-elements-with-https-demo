// components/CheckoutPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrecy";

interface CheckoutPageProps {
  amount: number;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch client secret");
        }

        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret received");
        }
      } catch (error) {
        setErrorMessage("Failed to initialize payment. Please try again.");
        console.error("Payment initialization error:", error);
      }
    };

    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(undefined);

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      console.error("Payment error:", error);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center p-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <PaymentElement className="mb-6" />

      {errorMessage && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        className="w-full p-4 text-white bg-black rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-800"
        type="submit"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default CheckoutPage;