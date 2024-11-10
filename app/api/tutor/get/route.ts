import { fetchTutors } from "@/app/supabase/tutor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tutors = await fetchTutors();
    return NextResponse.json({ tutors }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
