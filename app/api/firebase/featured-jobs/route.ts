import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../firebaseConfig";

export async function GET() {
  try {
    const q = query(collection(db, "employers"), where("featured", "==", true));

    const querySnapshot = await getDocs(q);
    const employers: object[] = [];

    querySnapshot.forEach((doc) => {
      employers.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ employers: employers, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
