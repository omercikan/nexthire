import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route handler to set a cookie with a provided key and token.
 *
 * Expects a POST request with JSON body containing:
 * - `key`: The name of the cookie to set.
 * - `token`: The token value to be stored (Base64 encoded before setting).
 *
 * Sets a secure, HTTP-only cookie with strict SameSite policy and 1-day expiry.
 *
 * @param req - Incoming Next.js request with JSON body containing `key` and `token`.
 * @returns JSON response indicating success or failure.
 */

export async function POST(req: NextRequest) {
  const { key, token } = await req.json();
  const cookieStore = await cookies();

  try {
    cookieStore.set(key, btoa(token), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      { message: "Token stored successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "An error occurred while setting the cookie" },
      { status: 400 }
    );
  }
}
