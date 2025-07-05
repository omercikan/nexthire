import React from "react";
import JobApplication from "../JobApplication";
import FavoriteItem from "@/components/FavoriteItem";
import IntroDeadline from "./IntroDeadline";
import { FavoriteField } from "@/types/favorite";
import { JobIntroRightSection } from "@/types/jobDetail";
import { Typography } from "@mui/material";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";

const IntroRight = ({
  postId,
  jobTitle,
  location,
  isLoading,
  companyLogo,
  companyName,
  numberOfEmployees,
  applicationDeadlineDate,
}: JobIntroRightSection) => {
  return (
    <div>
      <IntroDeadline
        applicationDeadlineDate={applicationDeadlineDate}
        isLoading={isLoading}
      />

      <div className="flex gap-5">
        <JobApplication
          isLoading={isLoading}
          applicationDeadlineDate={applicationDeadlineDate}
        />

        {isLoading ? (
          <Typography variant="button">
            <LoaderSkeleton
              animationType="wave"
              length={1}
              variant="rectangular"
              sxClass={{
                borderRadius: "8px",
                width: "50px",
                height: "50px",
              }}
            />
          </Typography>
        ) : (
          <FavoriteItem
            favoriteButtonClass="bg-[#D7E3F5] hover:bg-[#4359ff] transition-colors duration-500 group w-[50px] h-[50px] px-4 rounded-lg grid place-content-center cursor-pointer"
            favoriteIconClass="text-[#1967D2] group-hover:text-white transition-colors duration-500 text-[22px]"
            data={{
              dataField: {
                postID: postId,
                companyLocation: location,
                companyLogo: companyLogo,
                companyName: companyName,
                numberOfEmployees: numberOfEmployees,
              },
              postID: postId,
            }}
            extraField={jobTitle}
            fieldName={FavoriteField.Jobs}
          />
        )}
      </div>
    </div>
  );
};

export default IntroRight;
