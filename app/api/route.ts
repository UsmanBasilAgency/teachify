import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    return new Response(
        JSON.stringify({
            message: 'Hello World'
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" }
        }
    );
}
