import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    try {
      supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    } catch (error) {
      console.error("Supabase client not initialized");
      console.error(
        "NEXT_PUBLIC_SUPABASE_URL:",
        process.env.NEXT_PUBLIC_SUPABASE_URL
      );
      console.error(
        "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      console.error("Error:", error);
      throw new Error("Supabase client not initialized");
    }
  }
  return supabase;
};
