import { Role, Tables } from "@/utils/const";
import { extractRolesSupabaseResult } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function validateRoles(userRoles: Role[], roles: Role[]): boolean {
    return (
        roles.length !== 0 &&
        userRoles.length !== 0 &&
        userRoles.filter((role) => roles.includes(role)).length !== 0
    );
}

export async function POST(req: NextRequest) {
    try {
        const { roles } = await req.json();

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

        if (validateRoles(extractRolesSupabaseResult(data), roles)) {
            return new Response(
                JSON.stringify({ message: "User Authorized" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            );
        } else {
            return new Response(JSON.stringify({ message: "Forbidden" }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }
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
