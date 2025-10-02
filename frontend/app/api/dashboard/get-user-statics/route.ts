import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebase/firebaseConfig";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const candidateId = params.get("candidateId");

  try {
    const appliedCountQuery = query(
      collection(db, "applications"),
      where("cid", "==", candidateId)
    );

    const appliedJobCount = (
      await getCountFromServer(appliedCountQuery)
    ).data();

    return NextResponse.json({
      appliedJobCount: appliedJobCount.count,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
