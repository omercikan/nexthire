import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setUserDatabase } from "@/lib/setUserDatabase";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { name, surname, acceptedTerms, email, password } = await req.json();
  const cookieStore = await cookies();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential.user) {
      cookieStore.set("VV9SVA", btoa(userCredential.user.refreshToken), {
        secure: process.env.NODE_ENV === "production",
      });
    }

    const createdData = {
      id: userCredential.user.uid,
      name: `${name} ${surname}`,
      acceptedTerms: acceptedTerms,
      email: email,
      emailVerified: userCredential.user.emailVerified,
      createdWith: "Email/Password Provider",
      role: "candidate",
    };

    await setUserDatabase("candidates", userCredential, createdData);
    await setUserDatabase("users", userCredential, createdData);

    return NextResponse.json({ user: userCredential?.user });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
