"use client";

import { ReactNode } from "react";
import { PaymentProvider } from "@/context/paymentContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "./react-query-provider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <PaymentProvider>{children}</PaymentProvider>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
