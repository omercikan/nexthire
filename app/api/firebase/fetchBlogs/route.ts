import {
  collection,
  query,
  getDocs,
  getCountFromServer,
  orderBy,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { BlogPost } from "@/types";
import { db } from "../firebaseConfig";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startIndex = Number(searchParams.get("start"));
  const endIndex = Number(searchParams.get("end"));

  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    const querySnapshot = (await getDocs(q)).docs.slice(startIndex, endIndex);
    const blogs: BlogPost[] = [];

    querySnapshot.forEach((doc) => {
      blogs.push({ ...(doc.data() as BlogPost), id: doc.id });
    });

    const blogsCount = await getCountFromServer(collection(db, "blogs"));

    return NextResponse.json({
      blogs: blogs,
      blogsSize: blogsCount.data().count,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
