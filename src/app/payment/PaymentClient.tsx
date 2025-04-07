"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout-form";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { usePayment } from "@/context/paymentContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentClient() {
  const { amount } = usePayment();

  if (!amount) {
    return <div>Loading...</div>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
