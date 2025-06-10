import { AuthContext } from "@/context/authContext";
import useFavoriteCompany from "@/hooks/useFavoriteCompany";
import { Favorite } from "@/types/favorite";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useContext, useMemo } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const FavoriteCompany = ({ data, fieldName, extraField }: Favorite) => {
  const { user, loading } = useContext(AuthContext);
  const { addFavoriteCompany, result, updatedData } = useFavoriteCompany();

  const isFavorited = useMemo(() => {
    return updatedData?.[fieldName]?.some(
      (favorite) => favorite?.companyEID === data?.eid
    );
  }, [data?.eid, updatedData, fieldName]);

  const handleAddFavorite = useCallback(() => {
    addFavoriteCompany(
      { ...data?.dataField, extraField },
      data?.eid,
      fieldName
    );
  }, [addFavoriteCompany, data?.dataField, data?.eid, extraField, fieldName]);

  return (
    <>
      {user?.role === "candidate" || typeof user?.role === "undefined" && !loading ? (
        <button
          disabled={result.originalArgs?.id === data?.eid && result.isLoading}
          className={`favorite-icon-wrapper ${
            result.isLoading ? "pointer-events-none" : ""
          }`}
          onClick={handleAddFavorite}
        >
          {result.originalArgs?.id === data?.eid && result.isLoading ? (
            <CircularProgress
              size={18}
              className="!text-[#696969]"
              data-testid="CircularProgress"
            />
          ) : isFavorited ? (
            <GoBookmarkFill
              className="favorite-icon"
              data-testid="GoBookmarkFill"
            />
          ) : (
            <GoBookmark className="favorite-icon" data-testid="GoBookmark" />
          )}
        </button>
      ) : null}
    </>
  );
};

export default FavoriteCompany;
