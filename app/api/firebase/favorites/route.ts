import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebaseConfig";
import { Candidate } from "@/types";

export async function POST(req: NextRequest) {
  const {
    data,
    id,
    user,
    updatedData,
    setFavoritePath,
  }: {
    data: DocumentData;
    id: string;
    user: Candidate;
    updatedData: Candidate;
    setFavoritePath: string;
  } = await req.json();

  const {
    companyEID,
    companyLocation,
    companyLogo,
    companyName,
    numberOfEmployees,
  } = data.favoriteEmployers.Hu[0];

  try {
    if (user?.role === "candidate") {
      if (
        !updatedData?.favoriteEmployers?.some((favorite) =>
          favorite.companyEID.includes(id)
        )
      ) {
        const setFavoriteDatabase = (path: string) => {
          const ref = doc(db, path, user?.id ?? user?.cid);
          setDoc(
            ref,
            { favoriteEmployers: arrayUnion(data.favoriteEmployers.Hu[0]) },
            { merge: true }
          );
        };

        setFavoriteDatabase(setFavoritePath);
        setFavoriteDatabase("users");
      } else {
        const removeFavoriteDatabase = async (path: string): Promise<void> => {
          const ref = doc(db, path, user?.id ? user?.id : user?.cid);
          await updateDoc(ref, {
            favoriteEmployers: arrayRemove({
              companyEID,
              companyLocation,
              companyLogo,
              companyName,
              numberOfEmployees,
            }),
          });
        };

        removeFavoriteDatabase(setFavoritePath);
        removeFavoriteDatabase("users");
      }
    }

    return NextResponse.json({ message: "başarılı", status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
