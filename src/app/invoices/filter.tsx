import { CustomButton } from "@/components/ui/custom-button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

interface FilterProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  dueDateRange: [Date | null, Date | null];
  setDueDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >;
  amountRange: [number | null, number | null];
  setAmountRange: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
  statusFilters: string[];
  setStatusFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FilterDialog({
  columnFilters,
  setColumnFilters,
  dueDateRange,
  setDueDateRange,
  amountRange,
  setAmountRange,
  statusFilters,
  setStatusFilters,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const backdrop = document.querySelector(
      ".sheet-backdrop"
    ) as HTMLElement | null;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (backdrop) {
        backdrop.style.display = "block";
        backdrop.addEventListener("click", () => setIsOpen(false));
      }
    } else {
      document.body.style.overflow = "";

      if (backdrop) {
        backdrop.style.display = "none";
        backdrop.removeEventListener("click", () => setIsOpen(false));
      }
    }

    return () => {
      document.body.style.overflow = "";

      if (backdrop) {
        backdrop.style.display = "none";
        backdrop.removeEventListener("click", () => setIsOpen(false));
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideDialog =
        dialogRef.current && !dialogRef.current.contains(target);
      const clickedOutsideCalendar =
        calendarRef.current && !calendarRef.current.contains(target);

      if (clickedOutsideCalendar && clickedOutsideDialog) {
        setIsOpen(false);
        setCalendarIsOpen(false);
      } else if (clickedOutsideCalendar && !clickedOutsideDialog) {
        setCalendarIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  return (
    <>
      <button
        className="cursor-pointer relative text-foreground-muted hover:text-foreground flex items-center group bg-background shadow-xs border border-border p-[4px] w-[100px] gap-[10px] rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="h-full aspect-square w-auto flex items-center justify-center rounded-full bg-icon-background">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.46154 12H17.5385M4 7H20M10.1538 17H13.8462"
              stroke="#818181"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-foreground"
            />
          </svg>
        </div>
        Filter
      </button>
      <div
        className={`gap-[15px] px-[30px] py-[25px] fixed top-1/2 left-1/2 -translate-1/2 bg-background rounded-4xl shadow-xl w-[500px] transition-all duration-300 ease-in-out z-50 ${
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        ref={dialogRef}
      >
        <div className="flex items-center justify-between mb-[30px]">
          <h3>Filter Invoices</h3>
          <CustomButton
            variant={"icon"}
            className="rounded-sm text-button-foreground  hover:bg-background hover:shadow-none"
            onClick={() => setIsOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M18 18L6 6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </CustomButton>
        </div>
        <div className="">
          <div className="mb-[15px]">
            <label className="block mb-2 text-gray-700">Due Date</label>
            <div className="flex items-center justify-between">
              <DateRangePicker
                onUpdate={(values) => {
                  const from = values.range.from ?? null;
                  const to = values.range.to ?? null;
                  setDueDateRange([from, to]);
                }}
                initialDateFrom={formatDate(today)}
                initialDateTo={formatDate(today)}
                align="start"
                locale="en-GB"
                showCompare={false}
                calendarRef={calendarRef}
                open={calendarIsOpen}
                setIsOpen={setCalendarIsOpen}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Amount</label>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-foreground-muted text-sm">Min</label>
                <input
                  type="number"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={amountRange[0] ?? ""}
                  onChange={(e) =>
                    setAmountRange([
                      e.target.value ? Number(e.target.value) : null,
                      amountRange[1],
                    ])
                  }
                />
              </div>
              <div>
                <label className="text-foreground-muted text-sm">Max</label>
                <input
                  type="number"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={amountRange[1] ?? ""}
                  onChange={(e) =>
                    setAmountRange([
                      amountRange[0],
                      e.target.value ? Number(e.target.value) : null,
                    ])
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>Status</DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Paid", "Unpaid", "Overdue"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      setStatusFilters((prev) =>
                        prev.includes(status)
                          ? prev.filter((s) => s !== status)
                          : [...prev, status]
                      );
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={statusFilters.includes(status)}
                      readOnly
                      className="mr-2"
                    />
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <CustomButton
            variant={"outline"}
            onClick={() => {
              setDueDateRange([null, null]);
              setAmountRange([null, null]);
              setStatusFilters([]);
            }}
          >
            Reset
          </CustomButton>
          <div>
            <CustomButton className="mr-[15px]" variant={"outline"}>
              Cancel
            </CustomButton>
            <CustomButton
              variant={"default"}
              onClick={() => {
                setColumnFilters([
                  // example of setting filters
                  {
                    id: "dueDate",
                    value: dueDateRange,
                  },
                  {
                    id: "amount",
                    value: amountRange,
                  },
                  {
                    id: "status",
                    value: statusFilters,
                  },
                ]);
                setIsOpen(false);
              }}
            >
              Apply
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
