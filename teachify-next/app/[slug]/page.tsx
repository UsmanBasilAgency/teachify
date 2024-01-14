import { MessageBoxUI } from '@/components/MessageBoxUI';
import { isAuthenticated } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: { slug: string } }) {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    if (!params.slug) return redirect('/menu');
    return (
      <MessageBoxUI course={params.slug}/>
    );
  } else {
    return redirect('/login');
  }
}
