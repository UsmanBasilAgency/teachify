import { Tables } from "@/utils/const";
import { extractRolesSupabaseResult } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
            .from(Tables.userRoles)
            .select("role");

        if (error) {
            return new Response(
                JSON.stringify({
                    message: error.message,
                    code: error.code,
                    details: error.details
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        return new Response(
            JSON.stringify({
                message: "User Found",
                roles: extractRolesSupabaseResult(data)
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
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
