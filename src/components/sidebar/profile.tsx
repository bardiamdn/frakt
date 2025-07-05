"use client";
import Image from "next/image";
import { LogoutButton } from "../logout-button";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className="w-full border hover:border-transparent border-border flex items-center rounded-lg px-[5px] py-[5px] hover:bg-accent cursor-pointer"
      >
        <div className="relative h-full aspect-square mr-[10px]">
          <Image
            src={"/bebulai.png"}
            alt="Agency logo"
            className="rounded-xs"
            width={50}
            height={50}
            priority
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-[7px]">
          <span className="text-sm text-foreground">Agency Settings</span>
          <span className="text-xs text-foreground-muted">NebulAI</span>
        </div>

        <svg
          className="ml-auto"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5999 15.6L11.9999 19.2L8.3999 15.6M8.3999 8.40005L11.9999 4.80005L15.5999 8.40005"
            stroke="#7C7C7C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`rounded-lg border border-border absolute top-0 left-[calc(100%+5px)] w-full px-[30px] py-[35px] h-auto bg-background shadow-2xl z-50 transition-opacity duration-100 ease-[cubic-bezier(0.83, 0, 0.17, 1)] ${
          openMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <LogoutButton />
      </div>
    </div>
  );
}
