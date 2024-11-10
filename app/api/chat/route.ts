import { supabase } from "@/app/supabase/SupabaseClient";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import OpenAI from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { NextResponse } from "next/server";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface Course {
  id: string;
  name: string;
  description: string;
  rawText: string;
}
export async function POST(req: Request) {
  const { previousMessages = [], message, tutorId } = await req.json();

  const openai = new OpenAI();

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const { data: tutor, error: tutorError } = await supabase
    .from("tutors")
    .select("kbList")
    .eq("id", tutorId)
    .single();

  if (tutorError || !tutor) {
    throw new Error("Tutor not found");
  }

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, name, description, rawText, embedding")
    .in("id", tutor.kbList);

  if (coursesError || !courses) {
    throw new Error("Error fetching courses");
  }

  const documents = courses.map(
    (course) =>
      new Document({
        pageContent: course.rawText || "",
        metadata: {
          id: course.id,
          name: course.name,
          description: course.description,
        },
      })
  );

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  try {
    // 5. Perform similarity search on the restricted set
    const results = await vectorStore.similaritySearch(message, 1);

    // Find the matching course from our original courses array
    const relevantCourse = courses.find(
      (course) => course.id === results[0]?.metadata?.id
    );

    if (!relevantCourse) {
      throw new Error("No relevant course found");
    }

    // 6. Generate response using the relevant course
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful tutor. Answer questions based on the following course content with a maximum of 2 sentences:
          Course: ${relevantCourse.name}
          Content: ${relevantCourse.rawText}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: false,
    });

    // 7. Clean up (if necessary)
    // You might want to add cleanup logic here to remove temporary vectors

    return NextResponse.json(
      { answer: completion.choices[0].message.content },
      { status: 200 }
    );
    // return NextResponse.json(
    //   {
    //     messages: [
    //       ...previousMessages,
    //       {
    //         id: previousMessages.length,
    //         content: message,
    //         role: "user",
    //         createdAt: new Date(),
    //       },
    //       {
    //         id: previousMessages.length + 1,
    //         content: ,
    //         role: "assistant",
    //         createdAt: new Date(),
    //       },
    //     ],
    //   },
    //   { status: 200 }
    // );
  } finally {
    // 8. Cleanup: Drop the temporary vectors if you created them
    // Add cleanup logic here if needed
  }
}
