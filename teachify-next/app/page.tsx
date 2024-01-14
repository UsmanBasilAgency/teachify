import { MessageBoxUI } from '@/components/MessageBoxUI';
import { isAuthenticated } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

export default async function Home() {
  return redirect('/menu');
}