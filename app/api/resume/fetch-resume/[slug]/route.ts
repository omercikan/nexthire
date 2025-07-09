import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebase/firebaseConfig";
import { CVDataFields } from "@/types/resume";

/**
 * Fetches resume data from the Firestore "users" collection based on the provided document ID.
 *
 * This function expects a dynamic route parameter named "slug", which is used as the document ID.
 * It retrieves the "uploadedResumes" array from the Firestore document and returns it as JSON.
 *
 * @param {NextRequest} _req - The incoming request object (not used here).
 * @param {{ params: { slug: string } }} param1 - Route parameters containing the document ID (slug).
 * @returns {Promise<NextResponse>} A JSON response with the resume data or an error message.
 */

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<
  | NextResponse<{
      resumeData: CVDataFields[];
    }>
  | NextResponse<{
      message: string;
    }>
  | undefined
> {
  const docID = params.slug;

  try {
    //? get resume from firestore ?//
    const resumeData: CVDataFields[] = [];
    const docRef = doc(db, "users", docID);
    const docSnap = await getDoc(docRef);
    resumeData.push(...(docSnap.data()?.uploadedResumes ?? []));

    return NextResponse.json({ resumeData: resumeData }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
