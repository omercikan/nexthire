import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { ApplicationData } from "@/types/jobApplication";

export async function POST(req: NextRequest) {
  const { applicationData }: { applicationData: ApplicationData } =
    await req.json();

  try {
    await addDoc(collection(db, "applications"), applicationData);

    return NextResponse.json(
      {
        ok: true,
        message: "Application submitted successfully",
        code: "APPLICATION_SUBMITTED",
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { ok: false, message, code: "APPLICATION_SUBMIT_ERROR" },
      { status: 500 }
    );
  }
}
