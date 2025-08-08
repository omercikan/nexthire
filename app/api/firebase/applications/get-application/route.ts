import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { ApplicationData } from "@/types/jobApplication";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const candidateId = searchParams.get("cid");
  const postId = searchParams.get("postId");

  try {
    //* Get user applied data *//
    const appliedQuery = query(
      collection(db, "applications"),
      where("cid", "==", candidateId),
      where("postId", "==", postId),
      limit(1)
    );

    const querySnapshot = await getDocs(appliedQuery);
    const firstDoc = querySnapshot?.docs[0];
    const objectData = firstDoc?.data() as ApplicationData;

    //* Get current job total applied count *//
    const totalAppliedQuery = query(
      collection(db, "applications"),
      where("postId", "==", postId)
    );
    const jobTotalAppliedCount: number = (
      await getCountFromServer(totalAppliedQuery)
    ).data().count;

    let totalAppliedText;

    if (jobTotalAppliedCount === 0) {
      totalAppliedText = "Henüz başvuru yok";
    } else if (jobTotalAppliedCount > 100) {
      totalAppliedText = "100'ün üzerinde başvuru";
    } else {
      totalAppliedText = `${jobTotalAppliedCount} kişi başvurdu`;
    }

    return NextResponse.json(
      { appliedData: objectData, totalAppliedText },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
