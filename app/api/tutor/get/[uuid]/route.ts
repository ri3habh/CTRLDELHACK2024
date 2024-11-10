import { fetchTutor } from "@/app/supabase/tutor";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params: { uuid: tutorId } }: { params: { uuid: string } }
) {
  try {
    const tutor = await fetchTutor(tutorId);
    return NextResponse.json({ tutor }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
