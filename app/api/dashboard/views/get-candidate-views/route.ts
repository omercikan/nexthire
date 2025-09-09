import { db } from "@/app/api/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId missing" }, { status: 400 });
  }

  const q = query(
    collection(db, "candidateViews"),
    where("userId", "==", userId)
  );

  const docs = (await getDocs(q)).docs.map((doc) => ({
    ...doc.data(),
  }));

  return NextResponse.json({ candidateViews: docs.at(0) });
}
