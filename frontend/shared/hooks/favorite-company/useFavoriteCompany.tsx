import { db } from "@/app/api/firebase/firebaseConfig";
import { AuthContext } from "@/features/auth/authContext";
import { useAddFavoriteMutation } from "@/shared/hooks/favorite-company/favoritesApi";
import { Candidate } from "@/shared/types/models/candidate";
import { FavoriteDataFields } from "@/shared/types/favorite";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFavoriteCompany = () => {
  const [updatedData, setUpdatedData] = useState<Candidate>();
  const [addFavorite, result] = useAddFavoriteMutation();
  const { user } = useContext(AuthContext);
  const candidateUser = user as Candidate;

  useEffect(() => {
    if (candidateUser) {
      const unsub = onSnapshot(doc(db, "users", candidateUser?._id), (doc) => {
        setUpdatedData(doc.data() as Candidate);
      });

      return () => unsub();
    }
  }, [candidateUser]);

  const addFavoriteCompany = useCallback(
    async (
      data: FavoriteDataFields & { extraField: string | undefined },
      postID: string,
      fieldName: string
    ) => {
      if (user?.role === "candidate") {
        await addFavorite({
          data: data,
          postID: postID,
          user: candidateUser,
          updatedData: updatedData as Candidate,
          fieldName: fieldName,
        });
      } else {
        toast.error(
          <div>
            <p>Favorilere eklemek için giriş yapmalısınız.</p>
            <Link
              href="/aday-giris"
              className="block text-[#4045ef] hover:underline w-max"
            >
              Giriş Yap
            </Link>
          </div>,
          {
            id: "favorite-toast",
            duration: 2500,
          }
        );
      }
    },

    [addFavorite, candidateUser, updatedData, user?.role]
  );

  return { addFavoriteCompany, result, updatedData };
};

export default useFavoriteCompany;
