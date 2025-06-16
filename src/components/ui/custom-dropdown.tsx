"use client";
import { useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  items: string[];
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export const CustomDropdown = ({
  placeholder = "select one",
  label,
  items,
  disabled = false,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-start justify-center py-[15px] gap-[15px] ">
      <span className={disabled ? "text-foreground-muted" : "text-foreground"}>
        {label}
      </span>
      <div
        ref={dropdownRef}
        className="relative w-full rounded-full h-[50px] flex items-center justify-start z-10 shadow-xs"
      >
        <button
          onClick={() => setOpen(!open)}
          className={`w-full h-full flex items-center justify-between ${
            disabled
              ? null
              : "cursor-pointer group hover:text-foreground hover:border-foreground"
          }  text-foreground-muted border border-border pl-[20px] pr-[10px] rounded-full`}
        >
          {selected === null ? placeholder : items[selected]}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12.0008 14.58L17 10"
              stroke="#818181"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${
                disabled ? null : "group-hover:stroke-foreground"
              } stroke-foreground-muted`}
            />
          </svg>
        </button>
        <div
          className={`flex flex-col gap-[5px] absolute top-full left-0 w-full py-[25px] px-[15px] bg-background shadow-lg rounded-xl transition-all duration-200 ease-[cubic-bezier(0.83, 0, 0.17, 1)] ${
            open && !disabled
              ? "opacity-100 pointer-events-auto scale-100 translate-y-0"
              : "opacity-0 pointer-events-none scale-90 -translate-y-[10px]"
          }`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className="bg-pink-200 py-[10px] px-[10px] hover:bg-accent rounded-md"
              onClick={() => setSelected(index)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
