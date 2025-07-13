import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebaseConfig";
import { FavoriteAPIRoute } from "@/types/favorite";

export async function POST(req: NextRequest) {
  const {
    data,
    id,
    user,
    updatedData,
    setFavoritePath,
    fieldName,
  }: FavoriteAPIRoute = await req.json();

  try {
    if (user?.role === "candidate") {
      const isAlreadyFavorited = updatedData?.[fieldName]?.some(
        (item) => item.postID === id
      );
      const action = isAlreadyFavorited ? "remove" : "add";

      const updateFavorite = async (path: string) => {
        const ref = doc(db, path, user?.id);
        const updateData =
          action === "add"
            ? { [fieldName]: arrayUnion(data) }
            : { [fieldName]: arrayRemove(data) };

        await updateDoc(ref, updateData);
      };

      await Promise.all([
        updateFavorite(setFavoritePath),
        updateFavorite("users"),
      ]);
    }

    return NextResponse.json({ message: "Başarılı", status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
