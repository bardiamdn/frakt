import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/invoices/data-table";
import { columns, Payment } from "@/components/invoices/columns";
// import { payments } from "@/data/payment";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return payments;
// }

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // const paymentData = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        // data={paymentData}
      />
      <LogoutButton />
    </div>
  );
}
