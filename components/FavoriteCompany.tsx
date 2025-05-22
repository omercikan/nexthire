import { AuthContext } from "@/context/authContext";
import useFavoriteCompany from "@/hooks/useFavoriteCompany";
import { CircularProgress } from "@mui/material";
import { arrayUnion } from "firebase/firestore";
import React, { useContext } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const FavoriteCompany = ({
  job,
}: {
  job: {
    companyInformations: {
      companyId: string;
      companyLogo: string;
      companyName: string;
      location: string;
      numberOfEmployees: string;
    };
  };
}) => {
  const { user } = useContext(AuthContext);
  const { addFavoriteCompany, result, updatedData } = useFavoriteCompany();

  return (
    <>
      {user?.role === "candidate" || typeof user === "undefined" ? (
        <div
          className="absolute right-2 top-2 invisible group-hover:visible group-hover:bg-[#ECEDF2] hover:bg-[#ECEDF2] rounded-full w-[30px] h-[30px] transition-colors duration-300 grid place-content-center cursor-pointer"
          onClick={() =>
            addFavoriteCompany(
              {
                favoriteEmployers: arrayUnion({
                  companyEID: job.companyInformations.companyId,
                  companyLogo: job.companyInformations.companyLogo,
                  companyName: job.companyInformations.companyName,
                  companyLocation: job.companyInformations.location,
                  numberOfEmployees: job.companyInformations.numberOfEmployees,
                }),
              },
              job.companyInformations.companyId
            )
          }
        >
          {result.originalArgs?.id === job.companyInformations.companyId &&
          result.isLoading ? (
            <CircularProgress size={18} className="!text-[#696969]" />
          ) : updatedData?.favoriteEmployers?.some((favorite) =>
              favorite?.companyEID?.includes(job.companyInformations.companyId)
            ) ? (
            <GoBookmarkFill
              color="696969"
              size={18}
              className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
            />
          ) : (
            <GoBookmark
              color="696969"
              size={18}
              className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default FavoriteCompany;
