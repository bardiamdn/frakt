"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface PaymentContextType {
  amount: number | null;
  setAmount: (amount: number) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <PaymentContext.Provider value={{ amount, setAmount }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
