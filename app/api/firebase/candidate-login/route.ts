import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../firebaseConfig";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const cookieStore = await cookies();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential.user) {
      cookieStore.set("VV9SVA", btoa(userCredential.user.refreshToken), {
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return NextResponse.json({ user: userCredential.user });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
