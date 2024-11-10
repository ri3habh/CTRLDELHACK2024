import { upsertCourse } from "@/app/supabase/course";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

import OpenAI from "openai";

export const runtime = "edge";

interface PostRequestBody {
  name: string;
  description: string;
  rawText: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: PostRequestBody = await req.json();
    const { name, description, rawText } = body;

    const openai = new OpenAI();
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: rawText,
      encoding_format: "float",
    });

    // Extract the embedding output

    const id = v4();

    await upsertCourse({
      id,
      name,
      description,
      rawText,
      embedding: embedding.data[0].embedding,
    });
    return NextResponse.json({ id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
