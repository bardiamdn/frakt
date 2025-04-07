import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/invoices/data-table";
import { columns } from "@/components/invoices/columns";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }


  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
      />
      <LogoutButton />
    </div>
  );
}
