import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { Employer } from "@/types";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
    const q = query(collection(db, "employers"), where(slug, "==", true));

    const querySnapshot = await getDocs(q);
    const employers: Employer[] = [];

    querySnapshot.forEach((doc) => {
      employers.push({ ...(doc.data() as Employer) });
    });

    return NextResponse.json({
      employers: employers,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
