import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

import { Avatar } from "@nextui-org/react"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { ComposeNoteTextArea } from "./compose-note-textarea"

export function ComposeNote ({
    userAvatarUrl
}: {
    userAvatarUrl: string
}) {
    const addNote = async (formData: FormData) => {
        'use server'
        
        const content = formData.get('content')

        if (content == null) return

        const supabase = createServerActionClient({ cookies })

        // verify authenticated user
        const { data: { user }} = await supabase.auth.getUser()
        if (user == null) return 

        await supabase.from('notes').insert({ content, user_id: user.id })

        revalidatePath('/')
    }

    return (
        <form action={addNote} className='flex flex-row p-3 border-b border-white/20'>
            <img className="rounded-full w-10 h-10 object-contain mr-4" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
            <ComposeNoteTextArea />
            <button type="submit" className="bg-sky-500 font-bold rounded-full px-5 py-2 self-end">
                Create
            </button>
            </div>
        </form>
    )
}