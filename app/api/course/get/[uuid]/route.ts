import { fetchCourse } from "@/app/supabase/course";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params: { uuid: courseId } }: { params: { uuid: string } }
) {
  try {
    const agent = await fetchCourse(courseId);
    return NextResponse.json({ agent }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
