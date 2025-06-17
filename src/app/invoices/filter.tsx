export default function FilterButton() {
  return (
    <button className="cursor-pointer relative text-foreground-muted hover:text-foreground flex items-center group bg-background shadow-xs border border-border p-[4px] w-[100px] gap-[10px] rounded-full">
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
  );
}
