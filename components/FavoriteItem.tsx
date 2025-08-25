import { AuthContext } from "@/context/authContext";
import useFavoriteCompany from "@/hooks/useFavoriteCompany";
import { Favorite } from "@/types/favorite";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useMemo } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const FavoriteItem = ({
  data,
  fieldName,
  extraField,
  favoriteButtonClass,
  favoriteIconClass,
}: Favorite) => {
  const { user, loading } = useContext(AuthContext);
  const { addFavoriteCompany, result, updatedData } = useFavoriteCompany();

  const isFavorited = useMemo(() => {
    return updatedData?.[fieldName]?.some(
      (favorite) => favorite?.postID === data?.postID
    );
  }, [data?.postID, updatedData, fieldName]);

  const handleAddFavorite = useCallback(() => {
    addFavoriteCompany(
      { ...data?.dataField, extraField },
      data?.postID,
      fieldName
    );
  }, [
    addFavoriteCompany,
    data?.dataField,
    data?.postID,
    extraField,
    fieldName,
  ]);

  return (
    <>
      {user?.role === "candidate" ||
      (typeof user?.role === "undefined" && !loading) ? (
        <button
          disabled={
            result.originalArgs?.postID === data?.postID && result.isLoading
          }
          className={`${
            favoriteButtonClass ? favoriteButtonClass : "favorite-icon-wrapper"
          } ${result.isLoading ? "pointer-events-none" : ""}`}
          aria-label={isFavorited ? "Favorilerden kaldır" : "Favorilere ekle"}
          onClick={handleAddFavorite}
        >
          {result.originalArgs?.postID === data?.postID && result.isLoading ? (
            <CircularProgress
              size={18}
              className="!text-[#696969]"
              data-testid="CircularProgress"
            />
          ) : isFavorited ? (
            <GoBookmarkFill
              className={
                favoriteIconClass ? favoriteIconClass : "favorite-icon"
              }
              data-testid="GoBookmarkFill"
            />
          ) : (
            <GoBookmark
              className={
                favoriteIconClass ? favoriteIconClass : "favorite-icon"
              }
              data-testid="GoBookmark"
            />
          )}
        </button>
      ) : null}
    </>
  );
};

export default FavoriteItem;
