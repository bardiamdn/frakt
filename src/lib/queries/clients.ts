import { supabase } from "../supabaseClient";
import { Database } from "@/types/supabase";

type Client = Database["public"]["Tables"]["clients"]["Row"];

/**
 * Fetch all clients or paginated clients from the database.
 */
export const fetchAllClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};
