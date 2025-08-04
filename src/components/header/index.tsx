"use client";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CustomButton } from "../ui/custom-button";

export default function Header() {
  const [atTop, setAtTop] = useState(true);
  const [state, setState] = useState<
    "add" | "notifications" | "messages" | null
  >();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("header-icon")) return;

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setState(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={cn(
        " w-full h-[80px] bg-background-accent flex items-center py-[20px] px-[50px] justify-between sticky top-0 z-10 transition-shadow ease-in-out duration-200",
        atTop ? "shadow-none" : "shadow-md"
      )}
    >
      <SidebarTrigger />
      <div className=" relative w-[500px]">
        <div className="absolute top-1/2 left-[5px] -translate-y-1/2 p-[8px] rounded-full bg-icon-background">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0237 13.738L12.2017 10.9149C14.3132 8.09316 13.7375 4.09399 10.9158 1.98249C8.09409 -0.129014 4.09492 0.446724 1.98342 3.26842C-0.128083 6.09012 0.447654 10.0893 3.26935 12.2008C5.53598 13.8969 8.64914 13.8969 10.9158 12.2008L13.7389 15.0239C14.0937 15.3787 14.6689 15.3787 15.0236 15.0239C15.3784 14.6691 15.3784 14.0939 15.0236 13.7392L15.0237 13.738ZM7.1161 11.6559C4.6083 11.6559 2.57536 9.62296 2.57536 7.11517C2.57536 4.60737 4.6083 2.57443 7.1161 2.57443C9.62389 2.57443 11.6568 4.60737 11.6568 7.11517C11.6542 9.62183 9.62278 11.6532 7.1161 11.6559Z"
              fill="#818181"
              className="fill-icon"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search to find results"
          aria-label="Search"
          className="bg-background shadow-xs rounded-full w-full h-10 pl-[50px] pr-[10px] border focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex items-center gap-[15px] h-full">
        <Notifications setState={setState} />
        <Messages setState={setState} />
        <Add setState={setState} />
      </div>
      <div
        ref={containerRef}
        className={`absolute top-[calc(100%+10px)] right-[10px] w-[350px] h-[600px] bg-background rounded-2xl shadow-xl transition-all duration-200 ease-in-out ${
          !state
            ? "pointer-events-none opacity-0 scale-90"
            : "pointer-events-auto opacity-100 scale-100"
        }`}
      ></div>
    </header>
  );
}

const Notifications = ({
  setState,
}: {
  setState: Dispatch<
    SetStateAction<"add" | "notifications" | "messages" | null | undefined>
  >;
}) => {
  return (
    <CustomButton
      className="header-icon"
      variant="icon"
      onClick={() => setState("notifications")}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
      >
        <g clipPath="url(#clip0_133_88)">
          <path
            d="M17.4562 12.08L15.5496 5.20793C15.1424 3.73791 14.2553 2.4463 13.0293 1.53869C11.8034 0.631078 10.309 0.159612 8.78419 0.199329C7.25934 0.239046 5.79159 0.787664 4.61454 1.75787C3.43749 2.72807 2.61878 4.06411 2.28871 5.55333L0.813978 12.19C0.74262 12.5115 0.74436 12.845 0.819072 13.1657C0.893783 13.4865 1.03956 13.7864 1.24564 14.0433C1.45173 14.3002 1.71286 14.5075 2.00978 14.6501C2.3067 14.7926 2.63183 14.8666 2.96118 14.8667H5.60631C5.77462 15.6955 6.22431 16.4407 6.87919 16.976C7.53406 17.5113 8.35385 17.8037 9.19965 17.8037C10.0454 17.8037 10.8652 17.5113 11.5201 16.976C12.175 16.4407 12.6247 15.6955 12.793 14.8667H15.3376C15.6765 14.8665 16.0108 14.7881 16.3144 14.6375C16.6179 14.4869 16.8826 14.2682 17.0878 13.9984C17.2929 13.7287 17.433 13.4152 17.497 13.0824C17.561 12.7497 17.5466 12.4066 17.4562 12.08ZM9.19965 16.3333C8.74625 16.3315 8.30452 16.1895 7.93487 15.927C7.56521 15.6645 7.28571 15.2941 7.13458 14.8667H11.2647C11.1136 15.2941 10.8341 15.6645 10.4644 15.927C10.0948 16.1895 9.65304 16.3315 9.19965 16.3333ZM15.9206 13.1103C15.8522 13.201 15.7635 13.2745 15.6617 13.3248C15.5598 13.3751 15.4476 13.4008 15.334 13.4H2.96118C2.85137 13.4 2.74297 13.3753 2.64397 13.3278C2.54498 13.2803 2.45792 13.2111 2.38922 13.1255C2.32052 13.0398 2.27193 12.9398 2.24705 12.8329C2.22216 12.7259 2.22162 12.6147 2.24545 12.5075L3.72018 5.87087C3.98004 4.70209 4.62314 3.65371 5.54725 2.8924C6.47136 2.13108 7.62344 1.70053 8.82035 1.66917C10.0173 1.63782 11.1903 2.00746 12.153 2.71934C13.1157 3.43123 13.8128 4.44449 14.1335 5.59807L16.0402 12.4701C16.0713 12.5788 16.0767 12.6932 16.056 12.8043C16.0352 12.9155 15.9889 13.0202 15.9206 13.1103Z"
            fill="#818181"
          />
        </g>
        <defs>
          <clipPath id="clip0_133_88">
            <rect
              width="17.6"
              height="17.6"
              fill="white"
              transform="translate(0.399902 0.200001)"
            />
          </clipPath>
        </defs>
      </svg>
    </CustomButton>
  );
};

const Messages = ({
  setState,
}: {
  setState: Dispatch<
    SetStateAction<"add" | "notifications" | "messages" | null | undefined>
  >;
}) => {
  return (
    <CustomButton
      className="header-icon"
      variant="icon"
      onClick={() => setState("messages")}
    >
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
      >
        <g clipPath="url(#clip0_133_85)">
          <path
            d="M9.5998 0.200001C4.74734 0.200001 0.799805 4.14753 0.799805 9C0.799805 13.8525 4.74734 17.8 9.5998 17.8H18.3998V9C18.3998 4.14753 14.4523 0.200001 9.5998 0.200001ZM16.9331 16.3333H9.5998C5.5562 16.3333 2.26647 13.0436 2.26647 9C2.26647 4.9564 5.5562 1.66667 9.5998 1.66667C13.6434 1.66667 16.9331 4.9564 16.9331 9V16.3333ZM10.6998 9C10.6998 9.6072 10.207 10.1 9.5998 10.1C8.99261 10.1 8.4998 9.6072 8.4998 9C8.4998 8.3928 8.99261 7.9 9.5998 7.9C10.207 7.9 10.6998 8.3928 10.6998 9ZM14.3665 9C14.3665 9.6072 13.8737 10.1 13.2665 10.1C12.6593 10.1 12.1665 9.6072 12.1665 9C12.1665 8.3928 12.6593 7.9 13.2665 7.9C13.8737 7.9 14.3665 8.3928 14.3665 9ZM7.03314 9C7.03314 9.6072 6.54034 10.1 5.93314 10.1C5.32594 10.1 4.83314 9.6072 4.83314 9C4.83314 8.3928 5.32594 7.9 5.93314 7.9C6.54034 7.9 7.03314 8.3928 7.03314 9Z"
            fill="#818181"
          />
        </g>
        <defs>
          <clipPath id="clip0_133_85">
            <rect
              width="17.6"
              height="17.6"
              fill="white"
              transform="translate(0.799805 0.200001)"
            />
          </clipPath>
        </defs>
      </svg>
    </CustomButton>
  );
};

const Add = ({
  setState,
}: {
  setState: Dispatch<
    SetStateAction<"add" | "notifications" | "messages" | null | undefined>
  >;
}) => {
  return (
    <CustomButton
      className="header-icon"
      variant="icon"
      onClick={() => setState("add")}
    >
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
      >
        <rect
          x="1.60029"
          y="1.70002"
          width="17.6"
          height="17.6"
          rx="5.6"
          stroke="#818181"
          strokeWidth="1.6"
        />
        <path
          d="M10.4001 5.70007L10.4001 15.3001M15.2001 10.5001L5.6001 10.5001"
          stroke="#818181"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </CustomButton>
  );
};
