import Cookies from 'js-cookie'
import { NextRequest, NextResponse } from 'next/server'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code != null) {
        const supabase = createRouteHandlerClient({ cookies }) 
        // Exchange the code for a session
        const response = await supabase.auth.exchangeCodeForSession(code)

        // Check if there's an error in the response
        if (response.error) {
            console.error('Error exchanging code for session:', response.error.message)
            // Return a simple error response with the status code
            return new NextResponse(response.error.message, { status: 500 })
        }

        // Extract session from the response
        const session = response.data.session

        // Set the session token in a cookie
        Cookies.set('session', JSON.stringify(session))

        // Redirect the user to a different page
        //return NextResponse.redirect('/dashboard')
    }

    return NextResponse.redirect(requestUrl.origin)
}