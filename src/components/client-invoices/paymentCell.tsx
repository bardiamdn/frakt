"use client";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/paymentContext";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Database } from "@/types/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

export function PaymentCell({ row }: { row: Row<Invoice> }) {
  const router = useRouter();
  const { setAmount } = usePayment();
  const invoice = row.original;

  const handlePayment = () => {
    setAmount(invoice.amount);
    router.push("/payment");
  };

  if (!invoice.paid) {
    return (
      <Button variant="ghost" className="px-2" onClick={handlePayment}>
        <span>Pay Now</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(String(invoice.id))}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
