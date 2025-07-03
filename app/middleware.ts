// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', 'https://client.farcaster.xyz')
  response.headers.set('Access-Control-Allow-Methods', 'POST')
  return response
}
