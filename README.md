# Stripe Payment Integration with Next.js

A modern, secure payment processing application built with Next.js, Stripe, and Clerk Authentication. This project demonstrates how to implement secure payment processing with a clean, user-friendly interface.

![Stripe Payment Demo](public/demo-screenshot.png)

## Features

- 🔐 Secure authentication with Clerk
- 💳 Stripe payment processing
- 💰 Custom amount input
- 🎨 Modern UI with Tailwind CSS
- ✨ Real-time payment status updates
- 📱 Responsive design
- 🔒 Secure payment handling

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Payment Processing:** Stripe
- **Authentication:** Clerk
- **Styling:** Tailwind CSS
- **Type Safety:** TypeScript

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Stripe account with API keys
- A Clerk account with API keys

## Environment Variables

Create a `.env` file in the root directory with:
env
NEXT_PUBLIC_STRIPE_PUBLIC=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key


## Installation

1. Clone the repository:

bash
git clone https://github.com/yourusername/stripe-payment-integration.git
cd stripe-payment-integration

2. Install dependencies:

   bash
npm install

3. Run the development server:
bash
npm run dev

## Project Structure

├── app/
│ ├── api/
│ │ └── create-payment-intent/
│ ├── payment-complete/
│ ├── payment-success/
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ └── CheckoutPage.tsx
├── lib/
│ └── convertToSubcurrency.ts
├── public/
│ └── stripe.jpg
└── middleware.ts

## Usage

1. Sign in using Clerk authentication
2. Enter the desired payment amount
3. Click "Continue to Payment"
4. Fill in the payment details using Stripe Elements
5. Complete the payment
6. View the success confirmation

## API Endpoints

- `POST /api/create-payment-intent`: Creates a new payment intent with Stripe
- Parameters:
  - `amount`: number (in dollars)
- Returns:
  - `clientSecret`: string (for completing the payment)

## Security Features

- Secure authentication with Clerk
- Protected API routes
- Environment variable protection
- Type-safe code with TypeScript
- Secure payment processing with Stripe

## Deployment

The application can be deployed on Vercel:

bash
npm run build
vercel deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Stripe Documentation
- Next.js Team
- Clerk Authentication
- Tailwind CSS Team

## Support

For support, email your-email@example.com or open an issue in the repository.
This README provides:
Project overview
Setup instructions
Features list
Technical details
Security information
Deployment guide
Contributing guidelines
You should:
Add your actual repository URL
Add a demo screenshot
Update the support email
Add any specific deployment instructions for your setup
Customize the license section according to your preferences
