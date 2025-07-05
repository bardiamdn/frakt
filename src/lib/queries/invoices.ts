// /src/lib/queries/invoices.ts
import { supabase } from "../supabaseClient";
import { Database } from "@/types/supabase";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];

/**
 * Fetch invoices, paginated, and optionally filtered by one or more "status" values:
 *   - "paid":   paid = true
 *   - "unpaid": paid = false AND due_date >= today
 *   - "overdue": paid = false AND due_date < today
 */
export const fetchInvoices = async ({
  page,
  pageSize,
  statusFilters,
}: {
  page: number;
  pageSize: number;
  statusFilters?: Array<"paid" | "unpaid" | "overdue">;
}): Promise<{ data: Invoice[]; count: number | null }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const today = new Date().toISOString().split("T")[0];

  let query = supabase
    .from("invoices")
    .select("*", { count: "exact" });

  if (statusFilters && statusFilters.length > 0) {
    const orClauses: string[] = [];

    for (const status of statusFilters) {
      switch (status) {
        case "paid":
          orClauses.push(`paid.eq.true`);
          break;

        case "unpaid":
          orClauses.push(`and(paid.eq.false,due_date.gte.${today})`);
          break;

        case "overdue":
          orClauses.push(`and(paid.eq.false,due_date.lt.${today})`);
          break;
      }
    }

    const combined = orClauses.join(",");

    query = query.or(combined);
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { data: data ?? [], count };
};

export const insertInvoice = async (invoice: Invoice) => {

  const { data, error } = await supabase
    .from("invoices")
    .insert(invoice)
    .select();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchInvoiceSummary = async () => {
  const res = await fetch("/api/invoices/summary");
  console.log("data from fetchINvoicesSummary", res)
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
};
