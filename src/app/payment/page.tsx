import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PaymentClient from "./PaymentClient";

export default async function PaymentPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <PaymentClient />;
}
