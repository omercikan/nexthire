import axios from "axios";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebase/firebaseConfig";
import { UploadedCV } from "@/types/resume";
import dayjs from "dayjs";
import { calculateCVSize } from "@/lib/utils/calculateCvSize";
import appendFormData from "@/lib/utils/appendFormData";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const docID = formData.get("docID");
  const cvID = formData.get("cvID");

  try {
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 3 * 1024 * 1024
    ) {
      const formData = appendFormData([
        { name: "file", value: file },
        {
          name: "upload_preset",
          value: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
        },
      ]);

      //? upload pdf to cloudinary ?//
      const apiURL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;
      const request = await axios.post(apiURL, formData);
      const data: UploadedCV = await request.data;

      //? resume save to firestore ?//
      const saveToFirestore = async (collectionName: string) => {
        const docRef = doc(db, collectionName, String(docID));
        await updateDoc(docRef, {
          uploadedResumes: arrayUnion({
            uploadTime: dayjs().format("DD.MM.YYYY"),
            url: data.secure_url,
            cvID: cvID,
            size: calculateCVSize(file.size),
            fileName: file.name,
            createdAt: data.created_at,
          }),
        });
      };

      await Promise.all([
        saveToFirestore("users"),
        saveToFirestore("candidates"),
      ]);

      return NextResponse.json({ resumeData: data }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
