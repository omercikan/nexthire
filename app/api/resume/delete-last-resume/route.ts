import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebase/firebaseConfig";
import { CVDataFields } from "@/types/resume";

export async function POST(req: NextRequest) {
  const { lastResumeName, userID } = await req.json();

  try {
    const deleteLastResumeToDB = async (collection: string) => {
      const docRef = doc(db, collection, userID);
      const docSnap = await getDoc(docRef);
      const uploadedResumes: CVDataFields[] = docSnap.data()?.uploadedResumes;
      const findRemoveData = uploadedResumes.find(
        (resume) => resume.fileName === lastResumeName
      );

      await updateDoc(docRef, {
        uploadedResumes: arrayRemove(findRemoveData),
      });
    };

    await Promise.all([
      deleteLastResumeToDB("users"),
      deleteLastResumeToDB("candidates"),
    ]);

    return NextResponse.json({ message: "Resume deleted successfully." });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
