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
    fieldName,
  }: {
    data: DocumentData;
    id: string;
    user: Candidate;
    updatedData: Candidate;
    setFavoritePath: string;
    fieldName: string;
  } = await req.json();

  try {
    if (user?.role === "candidate") {
      if (
        !updatedData?.favoriteJobs?.some((favorite) =>
          favorite.companyEID.includes(id)
        ) &&
        fieldName === "favoriteJobs"
      ) {
        const setFavoriteDatabase = (path: string) => {
          const ref = doc(db, path, user?.id ?? user?.cid);

          setDoc(ref, { favoriteJobs: arrayUnion(data) }, { merge: true });
        };

        setFavoriteDatabase(setFavoritePath);
        setFavoriteDatabase("users");
      } else {
        const removeFavoriteDatabase = async (path: string): Promise<void> => {
          const ref = doc(db, path, user?.id ? user?.id : user?.cid);
          await updateDoc(ref, {
            favoriteJobs: arrayRemove(data),
          });
        };

        removeFavoriteDatabase(setFavoritePath);
        removeFavoriteDatabase("users");
      }

      if (
        !updatedData?.favoriteEmployers?.some((favorite) =>
          favorite.companyEID.includes(id)
        ) &&
        fieldName === "favoriteEmployers"
      ) {
        const setFavoriteDatabase = (path: string) => {
          const ref = doc(db, path, user?.id ?? user?.cid);

          setDoc(ref, { favoriteEmployers: arrayUnion(data) }, { merge: true });
        };

        setFavoriteDatabase(setFavoritePath);
        setFavoriteDatabase("users");
      } else {
        const removeFavoriteDatabase = async (path: string): Promise<void> => {
          const ref = doc(db, path, user?.id ? user?.id : user?.cid);

          await updateDoc(ref, {
            favoriteEmployers: arrayRemove(data),
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
