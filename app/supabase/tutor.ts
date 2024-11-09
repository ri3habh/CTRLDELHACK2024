import { Tables } from "../types/supbase";
import { supabase } from "./SupabaseClient";

export const dynamic = "force-dynamic";

export const upsertTutor = async (agent: Partial<Tables<"tutors">>) => {
  const { error } = await supabase.from("tutors").upsert(agent).select("*");
  if (error) throw error;
};
