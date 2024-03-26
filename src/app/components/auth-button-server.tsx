import { ReactElement } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButton } from './auth-button-client'

export async function AuthButtonServer(): Promise<ReactElement> {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session }} = await supabase.auth.getSession()
    
    return <AuthButton session={session} />
}