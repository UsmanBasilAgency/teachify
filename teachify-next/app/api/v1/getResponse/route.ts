// pages/api/getLLMResponse.js

import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
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
          messages
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
