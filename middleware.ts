import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only run on /email-preview
  if (request.nextUrl.pathname.startsWith('/email-preview')) {
    // Block access in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // In development, continue to the page
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/email-preview/:path*',
} 