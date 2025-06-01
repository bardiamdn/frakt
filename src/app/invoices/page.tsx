// "use client";
import InvoiceSummary from "@/app/invoices/invoice-summary";
import { DataTable } from "@/components/client-invoices/data-table";
import { columns } from "@/components/client-invoices/columns";

export default function InvoicesPage() {
  return (
    <div className="w-full flex flex-col">
      <InvoiceSummary />
      <div className="w-full py-10 px-[50px] ">
        <DataTable columns={columns} />
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
