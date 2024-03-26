'use client'

import { useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

export function ComposeNoteTextArea() {
    const { pending } = useFormStatus()
    const sent = useRef(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textAreaRef.current == null) return

        if (!pending && sent.current) {
            sent.current = false
            textAreaRef.current.value = ''
            return
        }

        sent.current = pending
    }, [pending])

    return(
        <textarea
            name="content"
            rows={4}
            className='w-full text-2x1 bg-black placeholder-gray-500 p-4'
            placeholder="Compose note"
        ></textarea>
    )
}