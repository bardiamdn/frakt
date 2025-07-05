import InvoiceSummary from "@/app/invoices/invoice-summary";
import InvoiceTable from "./invioce-table";
import { columns } from "./invioce-table/columns";
import Search from "@/components/search";
import FilterButton from "./filter";

export default function InvoicesPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col">
      <InvoiceSummary />
      <div className="w-full py-[50px] px-[50px] ">
        <div className="flex gap-[10px] mb-[15px]">
          <Search />
          <FilterButton />
        </div>
        <InvoiceTable columns={columns} />
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
