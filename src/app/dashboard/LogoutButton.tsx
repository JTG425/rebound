"use client";
import "./page.css"

import { useRouter } from 'next/navigation';
// Use your client-side Supabase client utility (make sure it's set up for client-side)
import { createClient } from '../../../utils/supabase/client';



export default function LogoutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/landing');
  };

  return (
    <button onClick={handleLogOut}>Log out</button>
  );
}
