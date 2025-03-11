'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentComplete() {
  const searchParams = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState({
    status: '',
    amount: '0',
    paymentId: ''
  });

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent');
    const status = searchParams.get('redirect_status');
    const amount = searchParams.get('amount') || '0';

    setTransactionDetails({
      status: status || 'succeeded',
      amount: amount,
      paymentId: payment_intent || ''
    });
  }, [searchParams]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-8">
          <div className="h-24 w-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Complete!</h1>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600">Your transaction has been processed successfully.</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xl font-semibold text-green-600">
              Amount Paid: ${transactionDetails.amount}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Transaction ID: {transactionDetails.paymentId.slice(0, 12)}...
            </p>
            <p className="text-sm text-gray-500">
              Status: <span className="text-green-500 font-medium capitalize">{transactionDetails.status}</span>
            </p>
          </div>
        </div>
        
        <div className="space-x-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Make Another Payment
          </Link>
        </div>
      </div>
    </main>
  );
} 