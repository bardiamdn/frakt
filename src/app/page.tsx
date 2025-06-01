import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/client-invoices/data-table";
import { columns } from "@/components/client-invoices/columns";
import AppSidebar from "@/components/sidebar";
import Header from "@/components/header";
import SummaryCards from "@/app/invoices/invoice-summary/summary-cards";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Nothing to see here</h1>
    </div>
  );
}
