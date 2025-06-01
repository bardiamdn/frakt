import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SidebarLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-[15px] py-[10px] my-[5px]",
        className
      )}
    >
      {children}
    </Link>
  );
}
