import { supabase } from "../supabaseClient";
import { Database } from "@/types/supabase";

type Client = Database["public"]["Tables"]["clients"]["Row"];

/**
 * Fetch all clients or paginated clients from the database.
 */
export const fetchAllClients = async (): Promise<Client[]> => {
  // const { data: session, error: sessionError } = await supabase.auth.getSession();
  // console.log("Session:", session);

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("name", { ascending: true });




  // const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  // if (sessionError) {
  //   console.error('Session error:', sessionError);
  // } else {
  //   console.log('Session:', sessionData?.session);
  //   console.log('User ID:', sessionData?.session?.user?.id);
  // }

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};
