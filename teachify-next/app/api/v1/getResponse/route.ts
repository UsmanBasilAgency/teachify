import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

async function getCourseOutlineContent(course: string | null): Promise<string | null> {
  if (!course) {
    return null
  }

  try {
    const filePath = path.join(process.cwd(), 'outlines', `${course}.txt`);
    const fileContent = await fs.readFile(filePath, 'utf8');

    return fileContent;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const { messages, course } = await req.json();
  const response = await getCourseOutlineContent(course);

  const updatedMessages = response != null ? [{
    role: "user",
    content: response
  }, ...messages] : messages;

  try {
    const openRouterResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          stream: true,
          messages: updatedMessages,
        }),
      }
    );

    if (!openRouterResponse.ok) {
      throw new Error("Failed to fetch from OpenRouter");
    }

    const stream = OpenAIStream(openRouterResponse)
    return new StreamingTextResponse(stream)

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
