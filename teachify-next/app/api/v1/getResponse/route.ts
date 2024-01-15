import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
import { getLastElement } from "@/utils/string";
import { createClient, getUser } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Models, Tables } from "@/utils/const";

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

async function getUserId() {
  const user = await getUser();
  return user?.id;
}

async function extractRequestData(req: NextRequest) {
  const json = await req.json();
  const course: string | null = json.course;
  const messages: Message[] = json.messages;
  const response = await getCourseOutlineContent(course);
  const userId = await getUserId();

  const context = {
    role: "user",
    content: response!
  } as Message;

  return {
    messages: response != null ? [context, ...messages] : messages,
    userId,
  }
}

export async function POST(req: NextRequest) {
  const { messages, userId } = await extractRequestData(req);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from(Tables.messages).insert({
    text: getLastElement<Message>(messages)?.content,
    user_id: userId,
  });

  console.error(error);

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
          model: Models.mistral,
          stream: true,
          messages,
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
