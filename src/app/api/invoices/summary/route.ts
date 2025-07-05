import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabaseAdmin";

export async function GET() {
  const { data: outstanding } = await supabaseAdmin
    .from("invoices")
    .select("amount", { count: "exact", head: false })
    .eq("paid", false);

  const { data: overdue } = await supabaseAdmin
    .from("invoices")
    .select("amount")
    .eq("paid", false)
    .lt("due_date", new Date().toISOString());

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  const { data: paidThisMonth } = await supabaseAdmin
    .from("invoices")
    .select("amount")
    .eq("paid", true)
    .gte("paid_at", startOfMonth);


  const rawOutstanding = outstanding?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
  const rawOverdue = overdue?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
  const rawPaidThisMonth = paidThisMonth?.reduce((sum, inv) => sum + inv.amount, 0) || 0;

  const totalOutstanding = Number(rawOutstanding.toFixed(2));
  const totalOverdue = Number(rawOverdue.toFixed(2));
  const totalPaidThisMonth = Number(rawPaidThisMonth.toFixed(2));

  return NextResponse.json({
    totalOutstanding,
    totalOverdue,
    totalPaidThisMonth,
  });

}
