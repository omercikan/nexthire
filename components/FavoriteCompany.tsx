import { AuthContext } from "@/context/authContext";
import useFavoriteCompany from "@/hooks/useFavoriteCompany";
import { CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const FavoriteCompany = ({
  data,
  fieldName,
  extraField,
}: {
  data: {
    dataField: {
      companyEID: string;
      companyLogo: string;
      companyName: string;
      companyLocation: string;
      numberOfEmployees: string;
    };
    eid: string;
  };
  extraField?: string;
  fieldName: string;
}) => {
  const { user } = useContext(AuthContext);
  const { addFavoriteCompany, result, updatedData } = useFavoriteCompany();

  return (
    <>
      {user?.role === "candidate" || typeof user === "undefined" ? (
        <div
          className="favorite-icon-wrapper"
          onClick={() =>
            addFavoriteCompany(
              { ...data.dataField, extraField },
              data?.eid,
              fieldName
            )
          }
        >
          {result.originalArgs?.id === data?.eid && result.isLoading ? (
            <CircularProgress size={18} className="!text-[#696969]" />
          ) : updatedData?.favoriteEmployers?.some((favorite) =>
              favorite?.companyEID?.includes(data?.eid)
            ) ||
            updatedData?.favoriteJobs?.some((favorite) =>
              favorite?.companyEID?.includes(data?.eid)
            ) ? (
            <GoBookmarkFill className="favorite-icon" />
          ) : (
            <GoBookmark className="favorite-icon" />
          )}
        </div>
      ) : null}
    </>
  );
};

export default FavoriteCompany;
