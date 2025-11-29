import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const tokens = ["next-auth.session-token", "ajt"];
  const isHaveAnyToken = tokens.some((token) => cookieStore.get(token));

  const accountRoute = request.nextUrl.pathname.startsWith("/hesabim");
  const protectedRoutes = [
    "/aday-uye-ol",
    "/aday-kayit-ol",
    "/isveren-giris",
    "/isveren-kayit",
  ];

  // route redirection controls
  if (isHaveAnyToken && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isHaveAnyToken && accountRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isHaveAnyToken && request.nextUrl.pathname === "/hesabim") {
    return NextResponse.redirect(new URL("/hesabim/genel-bakis", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
