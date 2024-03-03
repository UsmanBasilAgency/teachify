import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getLastElement } from "@/utils/string";
import { createClient, getUser } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Models, Tables } from "@/utils/const";

async function getCourseOutlineContent(
    course: string | null
): Promise<string | null> {
    if (!course) {
        return null;
    }

    try {
        const filePath = path.join(process.cwd(), "outlines", `${course}.txt`);
        const fileContent = await fs.readFile(filePath, "utf8");

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

    const context = [
        {
            role: "system",
            content: response!
        },
        {
            role: "system",
            content:
                "You are a helpful education assistant. Your answers must strongly be based on the course outline. Only answer questions using the context prior and if you're not sure of an answer, you can say 'I don't know'"
        }
    ] as Message[];

    const updated = response != null ? [...context, ...messages] : messages;

    return {
        messages: updated,
        userId,
        course
    };
}

export async function POST(req: NextRequest) {
    const { messages, userId, course } = await extractRequestData(req);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('code', course)
        .single()

    const { error } = await supabase.from(Tables.messages).insert({
        text: getLastElement<Message>(messages)?.content,
        user_id: userId,
        course_id: data?.id
    });

    if (error) console.error(error)

    try {
        const openRouterResponse = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: Models.mistral,
                    stream: true,
                    messages
                })
            }
        );

        if (!openRouterResponse.ok) {
            throw new Error("Failed to fetch from OpenRouter");
        }

        const stream = OpenAIStream(openRouterResponse);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.log("hello world")
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
