import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebase/firebaseConfig";
import { CVDataFields } from "@/types/resume";

/**
 * Fetches resume data from Firestore "users" collection based on the document ID
 * extracted from the dynamic route parameter "slug".
 *
 * The "slug" parameter is parsed from the request URL pathname.
 * Retrieves the "uploadedResumes" array from the Firestore document and returns it as JSON.
 *
 * @param {NextRequest} req - The incoming Next.js API request object.
 * @returns {Promise<NextResponse>} JSON response containing either:
 *    - `resumeData`: An array of CVDataFields objects (if found),
 *    - or `message`: An error message in case of failure.
 */

export async function GET(req: NextRequest): Promise<
  | NextResponse<{
      resumeData: CVDataFields[];
    }>
  | NextResponse<{
      message: string;
    }>
  | undefined
> {
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();

  try {
    //? get resume from firestore ?//
    const resumeData: CVDataFields[] = [];
    const docRef = doc(db, "users", String(slug));
    const docSnap = await getDoc(docRef);
    resumeData.push(...(docSnap.data()?.uploadedResumes ?? []));

    return NextResponse.json({ resumeData: resumeData }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
