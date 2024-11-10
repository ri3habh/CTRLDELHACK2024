import { Tables } from "../types/supbase";
import { supabase } from "./SupabaseClient";

export const dynamic = "force-dynamic";

export const upsertTutor = async (agent: Partial<Tables<"tutors">>) => {
  const { error } = await supabase.from("tutors").upsert(agent).select("*");
  if (error) throw error;
};

export const fetchTutors = async () => {
  const { data, error } = await supabase.from("tutors").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const fetchTutor = async (tutorId: string) => {
  const { data, error } = await supabase
    .from("tutors")
    .select("*")
    .eq("id", tutorId)
    .single();

  //if no tutor is found, return null
  if (error) {
    return null;
  }
  return data;
};
