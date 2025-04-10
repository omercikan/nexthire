import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("VV9SVA");

  if (token && (pathname === "/aday-uye-ol" || "/aday-giris")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/aday-uye-ol", "/aday-giris"],
};
