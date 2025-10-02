import { db } from "@/app/api/firebase/firebaseConfig";

import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const body = await req.json();

  const sanitizationData = Object.fromEntries(
    Object.entries(body).filter(([, v]) => v)
  );

  const userRef = doc(db, "users", userId);

  await setDoc(userRef, sanitizationData, {
    merge: true,
  });

  return NextResponse.json(
    { message: "Profile successfully updated" },
    { status: 200 }
  );
}
