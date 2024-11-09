import { Tables } from "../types/supbase";
import { supabase } from "./SupabaseClient";

export const dynamic = "force-dynamic";

export const upsertCourse = async (agent: Partial<Tables<"courses">>) => {
  const { error } = await supabase.from("courses").upsert(agent).select("*");
  if (error) throw error;
};
