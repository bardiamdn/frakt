// /src/lib/queries/invoices.ts
import { supabase } from "../supabaseClient";
import { Database } from "@/types/supabase";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

export const fetchInvoices = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<{ data: Invoice[]; count: number | null }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("invoices")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data: data ?? [], count };
};
