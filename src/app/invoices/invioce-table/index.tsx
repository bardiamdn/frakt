"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  flexRender,
} from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchInvoices } from "@/lib/queries/invoices";
import { Database } from "@/types/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function InvoiceTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const { data, isLoading, isError, error } = useQuery<TData[]>({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="rounded-xl h-full border bg-background">
      <Table className="w-full h-full text-sm">
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="px-[20px]">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="h-[200px] overflow-auto ">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-none px-[20px]">
              {row.getVisibleCells().map((cell) => (
                <TableCell className="py-[15px]" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex items-center justify-end space-x-2 py-[10px] px-[20px] border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
