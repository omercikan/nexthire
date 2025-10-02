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

    cookieStore.set("VVLOPQS", btoa(userCredential.user.refreshToken), {
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      user: userCredential.user,
      status: 200,
      message: "Giriş Başarılı",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
