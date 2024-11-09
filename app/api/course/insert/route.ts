import { upsertCourse } from "@/app/supabase/course";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const runtime = "edge";

interface PostRequestBody {
  name: string;
  description: string;
  rawText: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const body: PostRequestBody = await req.json();
    const { name, description, rawText } = body;
    const id = v4();

    await upsertCourse({
      id,
      name,
      description,
      rawText,
    });
    return NextResponse.json({ id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
