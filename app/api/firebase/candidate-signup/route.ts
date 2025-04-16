import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export async function POST(req: NextRequest) {
  const { name, surname, acceptedTerms, email, password } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "candidates", userCredential?.user.uid), {
      cid: userCredential.user.uid,
      name: `${name} ${surname}`,
      acceptedTerms: acceptedTerms,
      email: email,
      createdAt: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(
        "tr"
      ),
      emailVerified: userCredential.user.emailVerified,
      createdWith: "Email/Password Provider",
      role: "candidate",
    });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      id: userCredential.user.uid,
      name: `${name} ${surname}`,
      acceptedTerms: acceptedTerms,
      email: email,
      createdAt: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(
        "tr"
      ),
      emailVerified: userCredential.user.emailVerified,
      createdWith: "Email/Password Provider",
      role: "candidate",
    });

    return NextResponse.json({ user: userCredential?.user });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
