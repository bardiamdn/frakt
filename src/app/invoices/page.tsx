// "use client";
import InvoiceSummary from "@/app/invoices/invoice-summary";
// import { DataTable } from "@/components/client-invoices/data-table";
// import { columns } from "@/components/client-invoices/columns";
import InvoiceTable from "./invioce-table";
import { columns } from "./invioce-table/columns";

export default function InvoicesPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col">
      <InvoiceSummary />
      <div className="w-full py-10 px-[50px] ">
        <InvoiceTable columns={columns} />
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
