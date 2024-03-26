import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code != null) {
        const supabase = createRouteHandlerClient({ cookies }) 
        // using the code that we have passed via the URL
        // we get back the user session
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)
}