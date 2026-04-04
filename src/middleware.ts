import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthed = request.cookies.get("site-auth")?.value === "authenticated";
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isLoginApi = request.nextUrl.pathname === "/api/login";
  const isStudio = request.nextUrl.pathname.startsWith("/studio");

  // Allow login page, login API, and static assets through
  if (isLoginPage || isLoginApi || isStudio) {
    return NextResponse.next();
  }

  if (!isAuthed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - images (public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
