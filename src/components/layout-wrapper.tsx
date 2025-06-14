"use client";
import { usePathname } from "next/navigation";
import AppSidebar from "./sidebar";
import Header from "./header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where the layout should be minimal
  // const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthPage = pathname.includes("/auth");

  return (
    <main className="flex w-full">
      {!isAuthPage && <AppSidebar />}
      <div className="w-full h-full relative overflow-hidden">
        {!isAuthPage && <Header />}
        <div className="bg-background-accent">{children}</div>
      </div>
    </main>
  );
}
