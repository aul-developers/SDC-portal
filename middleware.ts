
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const needsAuth = request.nextUrl.pathname.startsWith('/dashboard')
    const hasToken = request.cookies.has('auth_token')

    if (needsAuth && !hasToken) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        url.searchParams.set('error', 'unauthorized')
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*',
}
