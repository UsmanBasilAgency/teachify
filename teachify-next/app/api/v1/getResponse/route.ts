// pages/api/getLLMResponse.js

// import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.body)
  const { userInput } = await req.json()
  console.log(userInput)
  if (!userInput) {
    return new Response(JSON.stringify({ message: "Error! No User Input!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
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
          model: "perplexity/pplx-70b-online",
          messages: [{ role: "user", content: userInput }],
        }),
      }
    );
    if (!openRouterResponse.ok) {
      throw new Error("Failed to fetch from OpenRouter");
    }
    const data = await openRouterResponse.json();
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // const stream = OpenAIStream(openRouterResponse)
 
    // return new StreamingTextResponse(stream)

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
