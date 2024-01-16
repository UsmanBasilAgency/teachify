import { Roles, Tables } from "@/utils/const";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

function validateRoles(
    data: { role: string }[] | null,
    error: PostgrestError | null,
    roles: Roles[]
): boolean {
    if (roles.length === 0) {
        return false;
    } else if (error || !data || data.length === 0) {
        return false;
    } else if (
        data
            .flatMap(({ role }) => (role ? (role as string).split(",") : []))
            .filter(
                (role) =>
                    Roles[role as keyof typeof Roles] &&
                    roles.includes(Roles[role as keyof typeof Roles])
            ).length === 0
    ) {
        return false;
    } else {
        return true;
    }
}

export async function POST(req: NextRequest) {
    try {
        const { roles } = await req.json();

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
            .from(Tables.userRoles)
            .select("role");

        if (validateRoles(data, error, roles)) {
            return new Response(
                JSON.stringify({ message: "User Authorized" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "Forbidden" }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" }
                }
            );
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
