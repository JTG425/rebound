import "./page.css"
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  } else {
    redirect('/dashboard')
  }

  return (
    <div className="page">
      <main className="page-main">
      </main>
      <footer className="page-footer">
      </footer>
    </div>
  );
}
