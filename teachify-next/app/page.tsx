import { MessageBoxUI } from '@/components/MessageBoxUI';
import { DarkModeContextProvider } from '@/context/darkModeContext';
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <DarkModeContextProvider>
        <MessageBoxUI />
      </DarkModeContextProvider>
    );
  } else {
    return redirect('/login');
  }
}
