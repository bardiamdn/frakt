"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  flexRender,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon } from "lucide-react";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export default function InvoiceTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [pageSizeOpen, setPageSizeOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const statusFilter = columnFilters.find((filter) => filter.id === "paid")
    ?.value as string[] | undefined;
  const { data, isLoading, isError, error } = useQuery<
    { data: Invoice[]; count: number | null },
    Error
  >({
    queryKey: ["invoices", pageIndex, pageSize, statusFilter],
    queryFn: () =>
      fetchInvoices({
        page: pageIndex,
        pageSize,
        statusFilters: statusFilter,
      }),
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "row_number",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data: (data?.data ?? []) as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: pageIndex - 1,
        pageSize,
      },
    },
    pageCount: data?.count ? Math.ceil(data.count / pageSize) : -1,
  });

  const handlePageSizeToggle = (value: number) => {
    setPageSize(value);
    setPageSizeOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        triggerRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setPageSizeOpen(false);
      }
    }
    if (pageSizeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pageSizeOpen]);

  return (
    <div className="rounded-xl border md:min-h-[600px] bg-background flex flex-col justify-between ">
      <Table className="w-full text-sm">
        <TableHeader className="z-10">
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

        <TableBody className="h-[100px]">
          {isLoading ? (
            [...Array(10)].map((_, index) => (
              <TableRow className="border-none px-[20px]" key={index}>
                {columns.map((col, i) => (
                  <TableCell className="py-[15px] px-[15px] " key={i}>
                    <Skeleton className="h-[16px] w-full mr-[20px]" />
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
            <TableRow className="">
              <TableCell
                colSpan={columns.length}
                className="h-[400px] text-center py-4"
              >
                An error occured.
              </TableCell>
            </TableRow>
          ) : (
            <TableRow className="">
              <TableCell
                colSpan={columns.length}
                className="h-[400px] text-center py-4"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between w-full py-[10px] px-[20px] border-t border-border">
        <div className="text-xs text-foreground-muted">
          <span>
            {(pageIndex - 1) * pageSize + 1}-
            {Math.min(pageIndex * pageSize, data?.count ?? 0)}
          </span>{" "}
          of {data?.count ? data.count : 0} results
        </div>
        <div className="flex items-center justify-end space-x-2 ">
          <div className="relative flex items-center mr-[30px] space-x-2">
            <span className="flex items-center text-xs text-foreground-muted">
              Rows per page:
            </span>
            <button
              ref={triggerRef}
              className="flex items-center text-xs text-foreground-muted w-[70px] gap-[8px] border border-border justify-between rounded-sm py-[5px] px-[15px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
              onClick={() => setPageSizeOpen(!pageSizeOpen)}
            >
              {table.getState().pagination.pageSize}
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L4 4.5L7 1.5"
                  stroke="#7C7C7C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              ref={wrapperRef}
              className={`${
                pageSizeOpen
                  ? "opacity-100 pointer-events-auto scale-100"
                  : "opacity-0 pointer-events-none scale-90"
              } shadow-2xl shadow-gray-200 p-[8px] border border-border z-10 absolute bottom-[calc(100%+7px)] right-0 bg-background h-auto w-auto rounded-md duration-200 transition-all ease-in-out `}
            >
              <button
                className="hover:bg-background-accent w-full text-xs text-foreground-muted rounded-sm p-[10px] flex items-center justify-between"
                onClick={() => handlePageSizeToggle(200)}
              >
                <CheckIcon
                  className={
                    pageSize === 200
                      ? "size-4 mr-[10px] opacity-100"
                      : "size-4 mr-[10px] opacity-0"
                  }
                />
                200
              </button>
              <button
                className="hover:bg-background-accent w-full text-xs text-foreground-muted rounded-sm p-[10px] flex items-center justify-between"
                onClick={() => handlePageSizeToggle(100)}
              >
                <CheckIcon
                  className={
                    pageSize === 100
                      ? "size-4 mr-[10px] opacity-100"
                      : "size-4 mr-[10px] opacity-0"
                  }
                />
                100
              </button>
              <button
                className="hover:bg-background-accent w-full text-xs text-foreground-muted rounded-sm p-[10px] flex items-center justify-between"
                onClick={() => handlePageSizeToggle(50)}
              >
                <CheckIcon
                  className={
                    pageSize === 50
                      ? "size-4 mr-[10px] opacity-100"
                      : "size-4 mr-[10px] opacity-0"
                  }
                />
                50
              </button>
              <button
                className="hover:bg-background-accent w-full text-xs text-foreground-muted rounded-sm p-[10px] flex items-center justify-between"
                onClick={() => handlePageSizeToggle(25)}
              >
                <CheckIcon
                  className={
                    pageSize === 25
                      ? "size-4 mr-[10px] opacity-100"
                      : "size-4 mr-[10px] opacity-0"
                  }
                />
                25
              </button>
            </div>
          </div>
          <button
            className="border border-border justify-center py-[5px] px-[15px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.8501 12.05L1.7501 6.95005L6.8501 1.85005"
                stroke={pageIndex === 1 ? "#CEBCCA" : "#7C7C7C"}
                strokeWidth="2.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-xs text-foreground-muted">
            {pageIndex}/{table.getPageCount()}
          </span>
          <button
            className="border border-border justify-center py-[5px] px-[15px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={
              data?.count
                ? pageIndex >= Math.ceil(data.count / pageSize)
                : false
            }
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.9502 12.15L7.0502 7.05002L1.9502 1.95002"
                stroke={
                  data?.count
                    ? pageIndex >= Math.ceil(data.count / pageSize)
                      ? "#CEBCCA"
                      : "#7C7C7C"
                    : "#7C7C7C"
                }
                strokeWidth="2.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
