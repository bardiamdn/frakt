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
  nameFilter,
  dueDateFrom,
  dueDateTo,
  amountMin,
  amountMax,
}: {
  page: number;
  pageSize: number;
  statusFilters?: Array<"paid" | "unpaid" | "overdue">;
  nameFilter?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  amountMin?: number;
  amountMax?: number;
}): Promise<{ data: Invoice[]; count: number | null }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const today = new Date().toISOString().split("T")[0];

  let query = supabase
    .from("invoices")
    .select("*", { count: "exact" });

  if (nameFilter?.trim()) {
    query = query.ilike("client_name", `%${nameFilter.trim()}%`);
  }

  if (dueDateFrom) query = query.gte("due_date", dueDateFrom);
  if (dueDateTo) query = query.lte("due_date", dueDateTo);

  if (typeof amountMin === "number") query = query.gte("amount", amountMin);
  if (typeof amountMax === "number") query = query.lte("amount", amountMax);

  if (statusFilters?.length) {
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

    query = query.or(orClauses.join(","));
  }

  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);
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
