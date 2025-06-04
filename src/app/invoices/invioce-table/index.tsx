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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function InvoiceTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const { data, isLoading, isError, error } = useQuery<
    { data: Invoice[]; count: number | null },
    Error
  >({
    queryKey: ["invoices", pageIndex, pageSize],
    queryFn: () => fetchInvoices({ page: pageIndex, pageSize }),
    // keepPreviousData: true,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: (data?.data ?? []) as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.count ? Math.ceil(data.count / pageSize) : -1,
    state: {
      sorting,
      pagination: {
        pageIndex: pageIndex - 1,
        pageSize,
      },
    },
  });

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="rounded-xl h-full border md:min-h-[600px] bg-background flex flex-col justify-between">
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

        <TableBody className="">
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <TableRow className="border-none px-[20px]" key={index}>
                {columns.map((col, i) => (
                  <TableCell className="py-[15px]" key={i}>
                    <Skeleton className="h-[16px] w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-none px-[20px]">
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-[15px]" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                An error occured.
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="w-full flex items-center justify-end space-x-2 py-[10px] px-[20px] border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={
            data?.count ? pageIndex >= Math.ceil(data.count / pageSize) : false
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
