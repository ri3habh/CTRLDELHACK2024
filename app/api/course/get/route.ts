import { fetchCourses } from "@/app/supabase/course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const courses = await fetchCourses();
    return NextResponse.json({ courses }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
