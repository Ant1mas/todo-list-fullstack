import { NextRequest } from 'next/server'

import { updateSession } from '@/lib/session'

export default async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
