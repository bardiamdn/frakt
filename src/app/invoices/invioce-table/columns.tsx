"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Database } from "@/types/supabase";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "lucide-react";
import { EditInvoiceCell } from "./edit-invoice";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

export function getColumns({
  statusFilters,
  setStatusFilters,
}: {
  statusFilters: string[];
  setStatusFilters: React.Dispatch<React.SetStateAction<string[]>>;
}): ColumnDef<Invoice>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="text-foreground-muted"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "row_number",
      header: ({ table, column }) => {
        const sort = column.getIsSorted();
        const sorted = column.getIsSorted();
        return (
          <div className="">
            <button
              className=" gap-[5px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full px-[10px] py-[5px]"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_241_101)">
                  <path
                    d="M0.376715 2.99996L0.282715 3.79996H9.50592L9.60032 2.99996H0.376715Z"
                    fill="#7C7C7C"
                  />
                  <path
                    d="M0.0944 6.2L0 7H9.2236L9.3176 6.2H0.0944Z"
                    fill="#7C7C7C"
                  />
                  <path
                    d="M3.19519 0.199866L2.04199 9.79987H2.84679L3.99959 0.199866H3.19519Z"
                    fill="#7C7C7C"
                  />
                  <path
                    d="M5.91736 -0.1L4.76416 9.5H5.56896L6.72216 -0.1H5.91736Z"
                    fill="#7C7C7C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_241_101">
                    <rect
                      width="9.6"
                      height="9.6"
                      fill="white"
                      transform="translate(0 0.200012)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z"
                  fill={sort !== "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                />
                <path
                  d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z"
                  fill={sort === "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                />
              </svg>
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="font-normal text-center overflow-clip text-foreground-muted w-[50px]">
          {row.index + 1}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
      accessorFn: (row) => row.created_at,
    },
    {
      accessorKey: "invoice_id",
      header: ({ table }) => (
        <div className="flex items-center justify-center gap-[5px] text-foreground-muted">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_133_153)">
              <path
                d="M12.2468 14C12.031 13.9994 11.8175 13.9561 11.6185 13.8725C11.4196 13.7888 11.2392 13.6667 11.0877 13.5129L7.50024 9.94642L3.91273 13.5153C3.68233 13.749 3.38685 13.9079 3.06481 13.9713C2.74277 14.0347 2.40911 13.9995 2.10732 13.8705C1.80254 13.7479 1.5418 13.5363 1.35917 13.2632C1.17653 12.9901 1.08049 12.6683 1.08357 12.3398V2.91667C1.08357 2.14312 1.39086 1.40125 1.93784 0.854272C2.48482 0.307291 3.22669 0 4.00023 0L11.0002 0C11.3833 0 11.7625 0.0754418 12.1164 0.222018C12.4703 0.368594 12.7918 0.583434 13.0626 0.854272C13.3335 1.12511 13.5483 1.44664 13.6949 1.80051C13.8415 2.15437 13.9169 2.53364 13.9169 2.91667V12.3398C13.9202 12.6681 13.8245 12.9897 13.6423 13.2627C13.4601 13.5357 13.1998 13.7475 12.8955 13.8705C12.69 13.9564 12.4695 14.0005 12.2468 14ZM4.00023 1.16667C3.53611 1.16667 3.09099 1.35104 2.7628 1.67923C2.43461 2.00742 2.25023 2.45254 2.25023 2.91667V12.3398C2.25002 12.437 2.27863 12.5321 2.33243 12.6131C2.38623 12.694 2.46281 12.7572 2.55251 12.7947C2.64221 12.8321 2.741 12.8422 2.83639 12.8235C2.93179 12.8048 3.01951 12.7583 3.08848 12.6898L7.0919 8.71092C7.2012 8.60227 7.34904 8.54129 7.50315 8.54129C7.65726 8.54129 7.80511 8.60227 7.9144 8.71092L11.9132 12.6887C11.9821 12.7572 12.0699 12.8037 12.1652 12.8223C12.2606 12.841 12.3594 12.831 12.4491 12.7935C12.5388 12.7561 12.6154 12.6929 12.6692 12.6119C12.723 12.531 12.7516 12.4359 12.7514 12.3387V2.91667C12.7514 2.45254 12.567 2.00742 12.2388 1.67923C11.9107 1.35104 11.4655 1.16667 11.0014 1.16667H4.00023Z"
                fill="#7C7C7C"
              />
            </g>
            <defs>
              <clipPath id="clip0_133_153">
                <rect
                  width="14"
                  height="14"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <span>Invoice ID</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className=" font-normal text-center overflow-clip text-foreground-muted">
          {row.getValue("invoice_id")}
        </div>
      ),
    },
    {
      accessorKey: "client_name",
      enableColumnFilter: true,
      sortingFn: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const b = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return a.localeCompare(b);
      },
      header: ({ table, column }) => {
        const sort = column.getIsSorted();
        const sorted = column.getIsSorted();
        return (
          <div className="flex items-center justify-center gap-[5px] text-foreground-muted">
            <button
              className=" gap-[5px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full px-[10px] py-[5px]"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_133_157)">
                  <path
                    d="M7.5 8C8.24168 8 8.9667 7.76541 9.58339 7.32588C10.2001 6.88635 10.6807 6.26164 10.9645 5.53074C11.2484 4.79983 11.3226 3.99556 11.1779 3.21964C11.0333 2.44372 10.6761 1.73098 10.1517 1.17157C9.6272 0.612165 8.95902 0.231202 8.23159 0.0768607C7.50416 -0.0774802 6.75016 0.00173314 6.06494 0.304484C5.37971 0.607234 4.79404 1.11992 4.38199 1.77772C3.96993 2.43552 3.75 3.20888 3.75 4C3.75099 5.06054 4.1464 6.07734 4.84945 6.82726C5.55249 7.57718 6.50574 7.99894 7.5 8ZM7.5 1.33334C7.99445 1.33334 8.4778 1.48973 8.88893 1.78275C9.30005 2.07577 9.62048 2.49224 9.8097 2.97951C9.99892 3.46678 10.0484 4.00296 9.95196 4.52024C9.8555 5.03753 9.6174 5.51268 9.26777 5.88562C8.91814 6.25856 8.47268 6.51254 7.98773 6.61543C7.50277 6.71832 7.00011 6.66551 6.54329 6.46368C6.08648 6.26185 5.69603 5.92005 5.42133 5.48152C5.14662 5.04299 5 4.52742 5 4C5 3.29276 5.26339 2.61448 5.73223 2.11438C6.20107 1.61429 6.83696 1.33334 7.5 1.33334Z"
                    fill="#7C7C7C"
                  />
                  <path
                    d="M7.5 9.33334C6.00867 9.33511 4.57889 9.96782 3.52435 11.0927C2.46982 12.2175 1.87665 13.7426 1.875 15.3333C1.875 15.5102 1.94085 15.6797 2.05806 15.8047C2.17527 15.9298 2.33424 16 2.5 16C2.66576 16 2.82473 15.9298 2.94194 15.8047C3.05915 15.6797 3.125 15.5102 3.125 15.3333C3.125 14.0957 3.58594 12.9087 4.40641 12.0335C5.22688 11.1583 6.33968 10.6667 7.5 10.6667C8.66032 10.6667 9.77312 11.1583 10.5936 12.0335C11.4141 12.9087 11.875 14.0957 11.875 15.3333C11.875 15.5102 11.9408 15.6797 12.0581 15.8047C12.1753 15.9298 12.3342 16 12.5 16C12.6658 16 12.8247 15.9298 12.9419 15.8047C13.0592 15.6797 13.125 15.5102 13.125 15.3333C13.1233 13.7426 12.5302 12.2175 11.4756 11.0927C10.4211 9.96782 8.99133 9.33511 7.5 9.33334Z"
                    fill="#7C7C7C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_133_157">
                    <rect width="15" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="flex items-center">
                Name
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z"
                    fill={sort === "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                  <path
                    d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z"
                    fill={sort !== "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                </svg>
              </span>
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className=" font-normal text-center overflow-clip">
          {row.getValue("client_name")}
        </div>
      ),
    },
    {
      accessorKey: "client_email",
      sortingFn: (rowA, rowB, columnId) => {
        const a = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const b = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return a.localeCompare(b);
      },
      header: ({ table, column }) => {
        const sort = column.getIsSorted();
        const sorted = column.getIsSorted();
        return (
          <div className="flex items-center justify-center gap-[5px] text-foreground-muted">
            <button
              className=" gap-[5px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full px-[10px] py-[5px]"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8986 5.12312C13.3442 3.47562 12.0292 2.1625 10.3804 1.61C8.4917 0.976246 6.51357 0.976871 4.62357 1.61C2.97357 2.16312 1.65857 3.47687 1.10545 5.12437C0.464199 7.0325 0.464199 8.9675 1.10545 10.8756C1.65857 12.5237 2.9742 13.8375 4.62357 14.39C5.5692 14.7069 6.53732 14.8675 7.50232 14.8675C8.46732 14.8675 9.43545 14.7069 10.3804 14.3906C10.7073 14.2812 10.8848 13.9269 10.7748 13.5994C10.6648 13.2719 10.3111 13.0969 9.98357 13.205C8.35045 13.7519 6.6542 13.7519 5.02045 13.205C3.74045 12.7756 2.7192 11.7569 2.28982 10.4781C1.73795 8.83437 1.73795 7.16687 2.28982 5.5225C2.7192 4.24437 3.73982 3.225 5.02045 2.79562C6.6542 2.24875 8.3492 2.24875 9.98357 2.79562C11.2629 3.22437 12.2842 4.24312 12.7136 5.52125C13.1961 6.95937 13.2529 8.42625 12.8829 9.88312C12.7017 10.14 12.4029 10.2969 12.0867 10.2969C11.5754 10.2969 11.1554 9.90125 11.1167 9.40062C11.3879 8.30375 11.3404 7.1975 10.9723 6.105C10.7248 5.3675 10.1354 4.77937 9.39795 4.5325C8.13795 4.11062 6.86232 4.11062 5.60357 4.5325C4.86545 4.78 4.27732 5.3675 4.0292 6.105C3.6067 7.3625 3.6067 8.6375 4.0292 9.895C4.2767 10.6325 4.86545 11.22 5.60357 11.4675C6.23295 11.6781 6.8667 11.7837 7.50045 11.7837C8.1342 11.7837 8.76795 11.6781 9.39732 11.4675C9.79045 11.3356 10.1411 11.1075 10.4204 10.8119C10.8186 11.2669 11.4123 11.5469 12.0861 11.5469C12.8686 11.5469 13.6023 11.1287 14.0004 10.4544C14.0292 10.405 14.0511 10.3525 14.0654 10.2975C14.5261 8.56937 14.4692 6.82875 13.8967 5.12312H13.8986ZM9.00107 10.2825C7.99295 10.6212 7.01107 10.6212 6.00232 10.2825C5.63357 10.1587 5.3392 9.86562 5.21545 9.4975C4.8767 8.49 4.8767 7.51062 5.21545 6.50312C5.3392 6.135 5.63295 5.84125 6.00232 5.71812C7.01107 5.37937 7.99295 5.37937 9.0017 5.71812C9.37045 5.84187 9.66482 6.135 9.78795 6.50375C10.1267 7.51062 10.1267 8.49062 9.78795 9.49812C9.66482 9.86625 9.37045 10.1594 9.00107 10.2825Z"
                  fill="#7C7C7C"
                />
              </svg>
              <span className="flex items-center">
                Email
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z"
                    fill={sort === "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                  <path
                    d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z"
                    fill={sort !== "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                </svg>
              </span>
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className=" font-normal text-center overflow-clip text-foreground-muted">
          {row.getValue("client_email")}
        </div>
      ),
    },
    {
      accessorKey: "due_date",
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = new Date(rowA.getValue(columnId));
        const dateB = new Date(rowB.getValue(columnId));
        return dateA.getTime() - dateB.getTime();
      },

      header: ({ table, column }) => {
        const sort = column.getIsSorted();
        const sorted = column.getIsSorted();
        return (
          <div className="flex items-center justify-center text-foreground-muted">
            <button
              className=" gap-[5px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full px-[10px] py-[5px]"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_133_168)">
                  <path
                    d="M10.625 6.69267C8.21313 6.69267 6.25 8.786 6.25 11.3593C6.25 13.918 8.21313 16 10.625 16C13.0369 16 15 13.9067 15 11.3333C15 8.77467 13.0369 6.69267 10.625 6.69267ZM10.625 14.6667C8.90187 14.6667 7.5 13.1827 7.5 11.3593C7.5 9.52133 8.90187 8.026 10.625 8.026C12.3481 8.026 13.75 9.51 13.75 11.3333C13.75 13.1713 12.3481 14.6667 10.625 14.6667ZM11.6919 11.5287C11.9363 11.7893 11.9363 12.2107 11.6919 12.4713C11.57 12.6013 11.41 12.6667 11.25 12.6667C11.09 12.6667 10.93 12.6013 10.8081 12.4713L10.1831 11.8047C10.0656 11.6793 10 11.51 10 11.3333V10C10 9.632 10.2794 9.33333 10.625 9.33333C10.9706 9.33333 11.25 9.632 11.25 10V11.0573L11.6919 11.5287ZM15 4.66667V6C15 6.368 14.7206 6.66667 14.375 6.66667C14.0294 6.66667 13.75 6.368 13.75 6V4.66667C13.75 3.564 12.9087 2.66667 11.875 2.66667H3.125C2.09125 2.66667 1.25 3.564 1.25 4.66667V5.33333H6.875C7.22 5.33333 7.5 5.632 7.5 6C7.5 6.368 7.22 6.66667 6.875 6.66667H1.25V12.6667C1.25 13.7693 2.09125 14.6667 3.125 14.6667H5.625C5.97 14.6667 6.25 14.9653 6.25 15.3333C6.25 15.7013 5.97 16 5.625 16H3.125C1.40188 16 0 14.5047 0 12.6667V4.66667C0 2.82867 1.40188 1.33333 3.125 1.33333H3.75V0.666667C3.75 0.298667 4.03 0 4.375 0C4.72 0 5 0.298667 5 0.666667V1.33333H10V0.666667C10 0.298667 10.2794 0 10.625 0C10.9706 0 11.25 0.298667 11.25 0.666667V1.33333H11.875C13.5981 1.33333 15 2.82867 15 4.66667Z"
                    fill="#7C7C7C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_133_168">
                    <rect width="15" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="flex items-center">
                Due date
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z"
                    fill={sort === "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                  <path
                    d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z"
                    fill={sort !== "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                </svg>
              </span>
            </button>
          </div>
        );
      },
      cell: ({ row }) => {
        const rawDate = row.getValue("due_date") as string | null;
        const displayDate = rawDate ? rawDate.split("T")[0] : "—";
        return (
          <div className="text-center overflow-clip text-foreground-muted">
            {displayDate}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      sortingFn: (rowA, rowB, columnId) => {
        const a = parseFloat(rowA.getValue(columnId)) || 0;
        const b = parseFloat(rowB.getValue(columnId)) || 0;
        return a - b;
      },

      header: ({ column }) => {
        const sort = column.getIsSorted();
        const sorted = column.getIsSorted();
        return (
          <div className="flex items-center justify-center gap-[5px] text-foreground-muted">
            <button
              className=" gap-[5px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full px-[10px] py-[5px]"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_133_174)">
                  <path
                    d="M8 0C3.86437 0 0.5 3.58867 0.5 8C0.5 12.4113 3.86437 16 8 16C12.1356 16 15.5 12.4113 15.5 8C15.5 3.58867 12.1356 0 8 0ZM8 14.6667C4.55375 14.6667 1.75 11.676 1.75 8C1.75 4.324 4.55375 1.33333 8 1.33333C11.4462 1.33333 14.25 4.324 14.25 8C14.25 11.676 11.4462 14.6667 8 14.6667ZM6.75 6.66667C6.75 6.91867 6.91937 7.132 7.1525 7.17333L9.05313 7.51133C9.89188 7.66 10.5 8.42667 10.5 9.33333C10.5 10.436 9.65875 11.3333 8.625 11.3333V12.6667H7.375V11.3333C6.34125 11.3333 5.5 10.436 5.5 9.33333H6.75C6.75 9.70133 7.03 10 7.375 10H8.625C8.97 10 9.25 9.70133 9.25 9.33333C9.25 9.08133 9.08062 8.868 8.8475 8.82667L6.94687 8.48867C6.10812 8.34 5.5 7.57333 5.5 6.66667C5.5 5.564 6.34125 4.66667 7.375 4.66667V3.33333H8.625V4.66667C9.65875 4.66667 10.5 5.564 10.5 6.66667H9.25C9.25 6.29933 8.97 6 8.625 6H7.375C7.03 6 6.75 6.29933 6.75 6.66667Z"
                    fill="#7C7C7C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_133_174">
                    <rect
                      width="15"
                      height="16"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="flex items-center">
                Amount
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z"
                    fill={sort === "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                  <path
                    d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z"
                    fill={sort !== "asc" && sorted ? "#7C7C7C" : "#CEBCCA"}
                  />
                </svg>
              </span>
            </button>
          </div>
        );
      },
      cell: ({ row }) => {
        const amount: number = row.getValue("amount");
        return (
          <div className="text-lg font-normal text-center overflow-clip">
            ${amount}
          </div>
        );
      },
    },
    {
      accessorKey: "paid",
      header: ({ column }) => {
        const [open, setOpen] = useState(false);
        const wrapperRef = useRef<HTMLDivElement>(null);
        const triggerRef = useRef<HTMLButtonElement>(null);
        // const initialFilter = column.getFilterValue() as string[] | undefined;
        const allStatuses = ["paid", "unpaid", "overdue"];
        // const [statusFilters, setStatusFilters] = useState<string[]>(
        //   () => {
        //     if (Array.isArray(initialFilter) && initialFilter.length) {
        //       return initialFilter;
        //     } else {
        //       return [...allStatuses];
        //     }
        //   }
        // );

        useEffect(() => {
          column.setFilterValue(statusFilters);
        }, [statusFilters, column]);

        const handleClick = (value: string) => {
          column.setFilterValue(
            value === column.getFilterValue() ? undefined : value
          );
        };

        const toggleStatus = (status: string) => {
          setStatusFilters((prev) => {
            const isCurrentlyChecked = prev.includes(status);
            if (isCurrentlyChecked) {
              if (prev.length === 1) {
                return prev;
              }
              return prev.filter((s) => s !== status);
            } else {
              return [...prev, status];
            }
          });
        };

        useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
            if (
              wrapperRef.current &&
              triggerRef.current &&
              !wrapperRef.current.contains(event.target as Node) &&
              !triggerRef.current.contains(event.target as Node)
            ) {
              setOpen(false);
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [open]);

        return (
          <div className="relative flex items-center justify-center text-foreground-muted">
            <button
              ref={triggerRef}
              className="relative group cursor-default gap-[5px] rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center h-full px-[10px] py-[5px]"
              onClick={() => setOpen(!open)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 1.33333H10.3931C10.135 0.557333 9.44 0 8.625 0H7.375C6.56 0 5.865 0.557333 5.60687 1.33333H5.5C3.77688 1.33333 2.375 2.82867 2.375 4.66667V12.6667C2.375 14.5047 3.77688 16 5.5 16H10.5C12.2231 16 13.625 14.5047 13.625 12.6667V4.66667C13.625 2.82867 12.2231 1.33333 10.5 1.33333ZM12.375 12.6667C12.375 13.7693 11.5337 14.6667 10.5 14.6667H5.5C4.46625 14.6667 3.625 13.7693 3.625 12.6667V4.66667C3.625 3.564 4.46625 2.66667 5.5 2.66667H6.125C6.47 2.66667 6.75 2.368 6.75 2C6.75 1.632 7.03062 1.33333 7.375 1.33333H8.625C8.97 1.33333 9.25 1.63267 9.25 2C9.25 2.36733 9.52938 2.66667 9.875 2.66667H10.5C11.5337 2.66667 12.375 3.564 12.375 4.66667V12.6667ZM10.9419 6.77667C11.1863 7.03733 11.1863 7.45867 10.9419 7.71933L8.71563 10.094C8.35813 10.4753 7.88937 10.668 7.42062 10.668C6.97813 10.668 6.535 10.4973 6.18313 10.1533L5.07812 9.07267C4.82375 8.82333 4.80625 8.402 5.03938 8.13067C5.2725 7.86 5.66812 7.84133 5.9225 8.08933L7.0275 9.17C7.2575 9.39467 7.61062 9.38667 7.83187 9.15133L10.0581 6.77667C10.3025 6.516 10.6975 6.516 10.9419 6.77667Z"
                  fill="#7C7C7C"
                />
              </svg>
              <span>Status</span>
              <svg
                className="group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out"
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
                open
                  ? "opacity-100 pointer-events-auto scale-100"
                  : "opacity-0 pointer-events-none scale-90"
              } shadow-2xl shadow-gray-200  p-[8px] border border-border z-10 absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-background h-auto w-auto rounded-md duration-200 transition-all ease-in-out `}
            >
              {allStatuses.map((status) => {
                const isChecked = statusFilters.includes(status);

                let bgColor = "bg-[#F0F1FA] text-[#4F5AED]";
                if (status === "paid") bgColor = "bg-[#E1FCEF] text-[#14804A]";
                if (status === "overdue")
                  bgColor = "bg-[#FAF0F2] text-[#D12953]";

                return (
                  <button
                    className="hover:bg-background-accent w-full rounded-sm p-[10px] flex items-center justify-between"
                    onClick={() => toggleStatus(status)}
                    key={status}
                  >
                    <CheckIcon
                      className={
                        isChecked
                          ? "mr-[10px] opacity-100"
                          : "mr-[10px] opacity-0"
                      }
                    />
                    <span
                      className={`block ${bgColor} py-[3px] px-[13px] rounded-full w-full`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      },
      cell: ({ row }) => {
        const paid: boolean = row.getValue("paid");
        const dueDateRaw: string = row.getValue("due_date");
        const dueDate = new Date(dueDateRaw);
        const now = new Date();

        if (paid) {
          return (
            <div className="flex items-center justify-center text-center overflow-clip text-foreground-muted">
              <span className="block bg-[#E1FCEF] py-[3px] px-[13px] rounded-full  text-[#14804A]">
                Paid
              </span>
            </div>
          );
        } else if (!paid && dueDate >= now) {
          return (
            <div className="flex items-center justify-center text-center overflow-clip text-foreground-muted">
              <span className="block bg-[#F0F1FA] py-[3px] px-[13px] rounded-full  text-[#4F5AED]">
                Unpaid
              </span>
            </div>
          );
        } else {
          return (
            <div className="flex items-center justify-center text-center overflow-clip text-foreground-muted">
              <span className="bg-[#FAF0F2] block py-[3px] px-[13px] rounded-full  text-[#D12953]">
                Overdue
              </span>
            </div>
          );
        }
      },
    },
    {
      accessorKey: "description",
      header: () => (
        <div className="flex items-center justify-center gap-[5px] text-foreground-muted">
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_133_186)">
              <path
                d="M11.66 1.08126L4.04001 8.70126C3.74898 8.99073 3.51825 9.33505 3.36119 9.71429C3.20413 10.0935 3.12385 10.5002 3.12501 10.9106V11.75C3.12501 11.9158 3.19086 12.0747 3.30807 12.192C3.42528 12.3092 3.58425 12.375 3.75001 12.375H4.58939C4.99986 12.3762 5.40649 12.2959 5.78574 12.1388C6.16498 11.9818 6.5093 11.751 6.79876 11.46L14.4188 3.84001C14.784 3.47387 14.9891 2.97781 14.9891 2.46064C14.9891 1.94347 14.784 1.44741 14.4188 1.08126C14.0473 0.726198 13.5532 0.528046 13.0394 0.528046C12.5255 0.528046 12.0315 0.726198 11.66 1.08126ZM13.535 2.95626L5.91501 10.5763C5.56259 10.9265 5.08627 11.1237 4.58939 11.125H4.37501V10.9106C4.37631 10.4138 4.57349 9.93744 4.92376 9.58502L12.5438 1.96501C12.6773 1.83749 12.8548 1.76632 13.0394 1.76632C13.224 1.76632 13.4015 1.83749 13.535 1.96501C13.6662 2.09659 13.7399 2.27482 13.7399 2.46064C13.7399 2.64646 13.6662 2.82469 13.535 2.95626Z"
                fill="#7C7C7C"
              />
              <path
                d="M14.375 6.11188C14.2092 6.11188 14.0503 6.17772 13.9331 6.29493C13.8158 6.41214 13.75 6.57112 13.75 6.73688V9.875H11.25C10.7527 9.875 10.2758 10.0725 9.92418 10.4242C9.57255 10.7758 9.375 11.2527 9.375 11.75V14.25H3.125C2.62772 14.25 2.15081 14.0525 1.79918 13.7008C1.44754 13.3492 1.25 12.8723 1.25 12.375V3.625C1.25 3.12772 1.44754 2.65081 1.79918 2.29918C2.15081 1.94754 2.62772 1.75 3.125 1.75H8.77625C8.94201 1.75 9.10098 1.68415 9.21819 1.56694C9.3354 1.44973 9.40125 1.29076 9.40125 1.125C9.40125 0.95924 9.3354 0.800269 9.21819 0.683058C9.10098 0.565848 8.94201 0.5 8.77625 0.5H3.125C2.2965 0.500992 1.50222 0.830551 0.916387 1.41639C0.330551 2.00222 0.000992411 2.7965 0 3.625L0 12.375C0.000992411 13.2035 0.330551 13.9978 0.916387 14.5836C1.50222 15.1695 2.2965 15.499 3.125 15.5H10.2144C10.6249 15.5012 11.0317 15.4209 11.411 15.2638C11.7904 15.1068 12.1348 14.8761 12.4244 14.585L14.0844 12.9238C14.3755 12.6343 14.6063 12.29 14.7634 11.9108C14.9206 11.5315 15.001 11.1249 15 10.7144V6.73688C15 6.57112 14.9342 6.41214 14.8169 6.29493C14.6997 6.17772 14.5408 6.11188 14.375 6.11188ZM11.5406 13.7013C11.2894 13.9519 10.9717 14.1254 10.625 14.2013V11.75C10.625 11.5842 10.6908 11.4253 10.8081 11.3081C10.9253 11.1908 11.0842 11.125 11.25 11.125H13.7031C13.6258 11.4709 13.4525 11.7881 13.2031 12.04L11.5406 13.7013Z"
                fill="#7C7C7C"
              />
            </g>
            <defs>
              <clipPath id="clip0_133_186">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>Description</span>
        </div>
      ),
      cell: ({ row }) => {
        const description: string = row.getValue("description");
        return (
          <div className="font-normal text-foreground-muted flex justify-center items-center ">
            {description ? (
              <div className="relative group hover:bg-background-accent p-[10px] rounded-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 9.83459V9.75M12 9.83459V9.75M16.5 9.83459V9.75M14.4457 16.3043L12 21L9.75 16.3043H5.25C4.00736 16.3043 3 15.297 3 14.0543V5.25C3 4.00736 4.00736 3 5.25 3H18.75C19.9926 3 21 4.00736 21 5.25V14.0543C21 15.297 19.9926 16.3043 18.75 16.3043H14.4457Z"
                    stroke="#7C7C7C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-foreground stroke-[##7c7c7c] "
                  />
                </svg>

                <div
                  className={`bg-background border border-border shadow-2xl shadow-gray-200/50 p-[10px] rounded-md w-[150px] h-[100px] absolute bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2 group-hover:pointer-events-auto group-hover:opacity-100 pointer-events-none opacity-0 text-center z-10`}
                >
                  <p className="break-words whitespace-normal block">
                    {row.getValue("description")}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="flex items-center justify-center gap-[5px] text-foreground-muted">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.8001 8.00015C4.8001 8.8838 4.08375 9.60015 3.2001 9.60015C2.31644 9.60015 1.6001 8.8838 1.6001 8.00015C1.6001 7.11649 2.31644 6.40015 3.2001 6.40015C4.08375 6.40015 4.8001 7.11649 4.8001 8.00015Z"
              stroke="#7C7C7C"
              strokeWidth="1.33333"
            />
            <path
              d="M9.6001 8.00015C9.6001 8.8838 8.88375 9.60015 8.0001 9.60015C7.11644 9.60015 6.4001 8.8838 6.4001 8.00015C6.4001 7.11649 7.11644 6.40015 8.0001 6.40015C8.88375 6.40015 9.6001 7.11649 9.6001 8.00015Z"
              stroke="#7C7C7C"
              strokeWidth="1.33333"
            />
            <path
              d="M14.4001 8.00015C14.4001 8.8838 13.6838 9.60015 12.8001 9.60015C11.9164 9.60015 11.2001 8.8838 11.2001 8.00015C11.2001 7.11649 11.9164 6.40015 12.8001 6.40015C13.6838 6.40015 14.4001 7.11649 14.4001 8.00015Z"
              stroke="#7C7C7C"
              strokeWidth="1.33333"
            />
          </svg>

          <span>Actions</span>
        </div>
      ),
      cell: ({ row }) => EditInvoiceCell({ row: row.original }),
    },
  ];
}
