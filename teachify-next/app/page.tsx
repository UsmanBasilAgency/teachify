import { MessageBoxUI } from '@/components/MessageBoxUI';
import { isAuthenticated } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    if (!searchParams?.course) return redirect('/menu');
    return (
      <MessageBoxUI course={searchParams?.course}/>
    );
  } else {
    return redirect('/login');
  }
}
