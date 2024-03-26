import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createServerComponentClient }from '@supabase/auth-helpers-nextjs'

import { AuthButtonServer } from '@/app/components/auth-button-server'
import { NotesList } from './components/notes-list'
import { Database } from './types/database'
import { ComposeNote } from './components/compose-note'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session }} = await supabase.auth.getSession()

  if (session == null) {
    redirect('/login')
}

  const { data: notes } = await supabase
    .from('notes')
    .select('*, user:users(name, avatar_url, user_name)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <section className="max-w-[800px] w-full nmx-auto border-l border-r border-white/30 h-full min-h-screen">
        <ComposeNote userAvatarUrl={session?.user?.user_metadata?.avatar_url}/>
        <NotesList notes={notes} />
      </section>
      <AuthButtonServer />
    </main>
  );
}
