import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/auth";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (user && user.role === 'admin') {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/admin/:path*',
}