import { Tables } from "../types/supbase";
import { supabase } from "./SupabaseClient";

export const dynamic = "force-dynamic";

export const upsertCourse = async (agent: Partial<Tables<"courses">>) => {
  const { error } = await supabase.from("courses").upsert(agent).select("*");
  if (error) throw error;
};

export const fetchCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const fetchCourse = async (courseId: string) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  //if no course is found, return null
  if (error) {
    return null;
  }
  return data;
};
