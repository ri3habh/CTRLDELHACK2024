import { upsertTutor } from "@/app/supabase/tutor";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface PostRequestBody {
  id: string;
  name: string;
  description: string;
  kbList: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: PostRequestBody = await req.json();
    const { id, name, description, kbList } = body;

    await upsertTutor({ name, description, id, kbList });
    return NextResponse.json({ id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
