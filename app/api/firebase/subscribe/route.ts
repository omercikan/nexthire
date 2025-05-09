import { addDoc, collection, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebaseConfig";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const docRef = await addDoc(collection(db, "subscriptions"), {
      email: email,
      createdAt: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(
        "tr"
      ),
    });

    if (docRef.id) return NextResponse.json({ message: "successful" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
