// /src/lib/queries/invoices.ts
import { supabase } from "../supabaseClient";

export const fetchInvoices = async () => {
  const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
