import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { ApplicationData } from "@/types/jobApplication";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const candidateId = searchParams.get("cid");
  const postId = searchParams.get("postId");

  try {
    const q = query(
      collection(db, "applications"),
      where("cid", "==", candidateId),
      where("postId", "==", postId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    const firstDoc = querySnapshot?.docs[0];
    const objectData = firstDoc?.data() as ApplicationData;

    return NextResponse.json({ appliedData: objectData }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
