"use client";

import { Calendar } from "@/components/ui/calendar";
import { useEffect, useRef, useState } from "react";

export const CalendarInput = ({
  label,
  parentRef,
  value,
  disabled = false,
}: {
  label: string;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  value?: Date;
  disabled?: boolean;
}) => {
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? value : new Date()
  );
  const [renderAbove, setRenderAbove] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCalendarIsOpen(false);
      }
    };

    if (calendarIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarIsOpen]);

  useEffect(() => {
    if (parentRef && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const calendarHeight = 300; // Approximate height of calendar

      if (spaceBelow < calendarHeight) {
        setRenderAbove(true);
      } else {
        setRenderAbove(false);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-start justify-center py-[15px] gap-[15px]">
      <span className={disabled ? "text-foreground-muted" : "text-foreground"}>
        {label}
      </span>
      <div
        ref={containerRef}
        className="relative w-full rounded-full border border-border h-[50px] flex items-center justify-start shadow-xs"
      >
        <input
          placeholder="IN-56213"
          className={`w-full h-full rounded-full px-[20px] ${
            disabled ? "text-foreground-muted" : "text-foreground"
          }`}
          value={date?.toLocaleDateString() || ""}
          readOnly
          onClick={() => setCalendarIsOpen(!calendarIsOpen)}
          disabled={disabled}
        />
        <button
          onClick={() => (disabled ? null : setCalendarIsOpen(!calendarIsOpen))}
          className="group rounded-full bg-icon-background cursor-pointer h-[40px] w-[40px] flex items-center justify-center absolute top-1/2 right-0 -translate-y-1/2 translate-x-[-5px]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="28" height="28" rx="14" fill="#F1EEF3" />
            <path
              d="M8.1999 11.5312H19.3999M9.64752 6.7998V8.03423M17.7999 6.7998V8.03408M20.1999 10.1941V19.0398C20.1999 20.2327 19.2448 21.1998 18.0666 21.1998H9.53324C8.35503 21.1998 7.3999 20.2327 7.3999 19.0398V10.1941C7.3999 9.00115 8.35503 8.03408 9.53324 8.03408H18.0666C19.2448 8.03408 20.1999 9.00115 20.1999 10.1941Z"
              stroke="#818181"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${
                disabled ? "stroke-icon" : "group-hover:stroke-foreground"
              }`}
            />
          </svg>
        </button>
        <Calendar
          className={`rounded-lg border absolute right-0 z-20 ${
            calendarIsOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          } ${
            renderAbove ? "bottom-[calc(100%+5px)]" : "top-[calc(100%+5px)]"
          }`}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
