"use client";
import InvoiceSummary from "@/app/invoices/invoice-summary";
import InvoiceTable from "./invioce-table";
import { getColumns } from "./invioce-table/columns";
import Search from "@/components/search";
import FilterDialog from "./filter";
import { useMemo, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function InvoicesPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [dueDateRange, setDueDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [amountRange, setAmountRange] = useState<
    [number | null, number | null]
  >([null, null]);

  const [statusFilters, setStatusFilters] = useState<string[]>([]);

  const columns = useMemo(
    () => getColumns({ statusFilters, setStatusFilters }),
    [statusFilters, setStatusFilters]
  );

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col">
      <InvoiceSummary />
      <div className="w-full py-[50px] px-[50px] ">
        <div className="flex gap-[10px] mb-[15px]">
          <Search
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <FilterDialog
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            dueDateRange={dueDateRange}
            setDueDateRange={setDueDateRange}
            amountRange={amountRange}
            setAmountRange={setAmountRange}
            statusFilters={statusFilters}
            setStatusFilters={setStatusFilters}
          />
        </div>
        <InvoiceTable
          columns={columns}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          dueDateRange={dueDateRange}
          setDueDateRange={setDueDateRange}
          amountRange={amountRange}
          setAmountRange={setAmountRange}
          statusFilters={statusFilters}
          setStatusFilters={setStatusFilters}
        />
      </div>
    </div>
  );
}
