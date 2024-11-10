// app/api/lib/supabase.ts

import { Database } from "@/app/types/supbase";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient<Database> | null = null;

export const getSupabase = (): SupabaseClient<Database> => {
  if (!supabase) {
    try {
      supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
      );
    } catch (error) {
      console.error("Supabase client not initialized");
      console.error(
        "NEXT_PUBLIC_SUPABASE_URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL
      );
      console.error("SUPABASE_SERVICE_KEY:", process.env.SUPABASE_SERVICE_KEY);
      console.error("Error:", error);
      throw new Error("Supabase client not initialized");
    }
  }
  return supabase;
};
