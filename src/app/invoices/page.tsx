// "use client";
import InvoiceSummary from "@/app/invoices/invoice-summary";
import InvoiceTable from "./invioce-table";
import { columns } from "./invioce-table/columns";
import Search from "@/components/search";

export default function InvoicesPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col">
      <InvoiceSummary />
      <div className="w-full py-[50px] px-[50px] ">
        <div className="flex gap-[10px] mb-[15px]">
          <Search />
          <button className="text-foreground-muted hover:text-foreground font-light flex items-center group bg-background p-[5px] gap-[10px] rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-icon-background rounded-full"
            >
              <path
                d="M6.46154 12H17.5385M4 7H20M10.1538 17H13.8462"
                stroke="#818181"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="group-hover:stroke-foreground"
              />
            </svg>
            Filter
          </button>
        </div>
        <InvoiceTable columns={columns} />
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
