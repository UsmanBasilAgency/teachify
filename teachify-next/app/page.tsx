import { Tables } from "@/utils/const";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const isProduction = process.env.NODE_ENV === "production";

    if (!isProduction) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase
            .from(Tables.messages)
            .select("*");

        return (
            <>
                <h1>Messages</h1>
                <ul>
                    {data
                        ? data.map((message) => (
                              <li key={message.id}>{message.text}</li>
                          ))
                        : null}
                </ul>
            </>
        );
    } else {
        return redirect("/menu");
    }
}
