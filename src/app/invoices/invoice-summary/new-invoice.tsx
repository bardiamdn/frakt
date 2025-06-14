"use client";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { useEffect, useRef, useState } from "react";

export const NewInvocie = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [openSelectClient, setOpenSelectClient] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        setOpenSheet(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <CustomButton
        className="rounded-sm text-button-foreground"
        onClick={() => setOpenSheet(true)}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 2.375L9.5 16.625M16.625 9.5L2.375 9.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-semibold">New</span>
      </CustomButton>
      <div
        className={`fixed top-0 right-0 w-[500px] px-[30px] py-[50px] h-screen overflow-y-auto bg-background shadow-2xl z-50 transition-transform duration-500 ease-[cubic-bezier(0.83, 0, 0.17, 1)] ${
          openSheet ? "translate-x-0" : "translate-x-full"
        }`}
        ref={sheetRef}
      >
        <div className="flex items-center justify-between">
          <h3>Invoices</h3>
          <CustomButton
            variant={"icon"}
            className="rounded-sm text-button-foreground hover:bg-background-accent"
            onClick={() => setOpenSheet(false)}
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
        <div>
          <CustomDropdown
            items={["client name 1", "client name 2", "client name 3"]}
            label="Client Name"
            placeholder="Select a client"
          />
          <div className="flex flex-col items-start justify-center py-[30px] gap-[20px]">
            <span className="text-foreground-muted">Email</span>
            <input
              disabled
              placeholder="Email@email.com"
              className="w-full rounded-full border border-border h-[50px] flex items-center justify-start px-[20px]"
            />
          </div>
          <div className="flex flex-col items-start justify-center py-[30px] gap-[20px]">
            <span className="text-foreground-muted">Invoice ID</span>
            <div className="relative w-full rounded-full border border-border h-[50px] flex items-center justify-start px-[20px]">
              <input disabled placeholder="IN-56213" />
              <button className="group rounded-full bg-icon-background cursor-pointer h-[40px] w-[40px] flex items-center justify-center absolute top-1/2 right-0 -translate-y-1/2 translate-x-[-5px]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.39196 10.304L6.07996 12.608M7.99996 14.528H14.144M3.00796 10.304L10.58 2.46743C11.3953 1.65213 12.7172 1.65213 13.5325 2.46743C14.3478 3.28272 14.3478 4.60458 13.5325 5.41988L5.69596 12.992L1.85596 14.144L3.00796 10.304Z"
                    stroke="#818181"
                    strokeWidth="1.28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-foreground stroke-icon"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center py-[30px] gap-[20px]">
            <span className="">Invoice Date</span>
            <div className="relative w-full rounded-full border border-border h-[50px] flex items-center justify-start px-[20px]">
              <input placeholder="IN-56213" />
              <button className="group rounded-full bg-icon-background cursor-pointer h-[40px] w-[40px] flex items-center justify-center absolute top-1/2 right-0 -translate-y-1/2 translate-x-[-5px]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.39196 10.304L6.07996 12.608M7.99996 14.528H14.144M3.00796 10.304L10.58 2.46743C11.3953 1.65213 12.7172 1.65213 13.5325 2.46743C14.3478 3.28272 14.3478 4.60458 13.5325 5.41988L5.69596 12.992L1.85596 14.144L3.00796 10.304Z"
                    stroke="#818181"
                    strokeWidth="1.28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-foreground stroke-icon"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
