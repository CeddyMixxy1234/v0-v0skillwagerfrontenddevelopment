import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/", "/auth/login", "/auth/signup", "/legal/terms", "/legal/privacy"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow all public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // For protected routes, we'll do client-side checking since we're using localStorage
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
