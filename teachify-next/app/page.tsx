import { Tables } from "@/utils/const";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from(Tables.messages).select('*');

  return (
    <>
      <h1>Messages</h1>
      <ul>
        {data ? data.map(message => (
          <li key={message.id}>{message.text}</li>
        )) : null}
      </ul>
    </>
  );

  // return redirect('/menu');
}