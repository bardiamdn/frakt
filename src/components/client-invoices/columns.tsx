"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Database } from "@/types/supabase";
import { PaymentCell } from "./paymentCell";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice_id",
    header: "Invoice ID",
  },
  {
    accessorKey: "date_issued",
    header: "Date Issued",
    cell: ({ row }) => {
      const rawDate = row.getValue("date_issued") as string | null;
      const displayDate = rawDate ? rawDate.split("T")[0] : "—";
      return <div>{displayDate}</div>;
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("due_date") as string | null;
      const displayDate = rawDate ? rawDate.split("T")[0] : "—";
      return <div>{displayDate}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount: number = row.getValue("amount");
      return <div className="text-center font-medium">${amount}</div>;
    },
  },
  {
    accessorKey: "paid",
    header: "Status",
    cell: ({ row }) => {
      const paid: boolean = row.getValue("paid");
      if (paid) {
        return <span className="text-center">Paid</span>;
      } else {
        return <span className="text-center text-red-500">Pending</span>;
      }
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: PaymentCell,
    // ({ row }: { row: any }) => {
    // const invoice: Invoice = row.original;
    // const router = useRouter();
    // const { setAmount } = usePayment();

    // if (!invoice.paid) {
    //   const handlePayment = () => {
    //     setAmount(invoice.amount);
    //     router.push("/payment");
    //   };

    //   return (
    //     <Button variant="ghost" className="px-2" onClick={handlePayment}>
    //       <span>Pay Now</span>
    //     </Button>
    //   );
    // } else {
    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild className="">
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuItem
    //           onClick={() =>
    //             navigator.clipboard.writeText(String(invoice.id))
    //           }
    //         >
    //           Copy payment ID
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem>View customer</DropdownMenuItem>
    //         <DropdownMenuItem>View payment details</DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    // }
    // },
  },
];
