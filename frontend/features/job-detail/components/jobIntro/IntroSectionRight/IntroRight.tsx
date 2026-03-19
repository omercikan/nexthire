import React from "react";
import JobApplication from "../JobApplication";
import IntroDeadline from "./IntroDeadline";
import { JobIntroRightSection } from "@/shared/types/jobDetail";
import FavoriteItem from "@/features/jobs/postings/components/Favorite/FavoriteItem";

const IntroRight = ({
  postId,
  jobTitle,
  location,
  companyLogo,
  jobCategory,
  applicationDeadlineDate,
  applicationMethod,
  applicationAddress,
}: JobIntroRightSection) => {
  return (
    <div>
      <IntroDeadline applicationDeadlineDate={applicationDeadlineDate} />

      <div className="flex gap-5">
        <JobApplication
          applicationAddress={applicationAddress}
          applicationDeadlineDate={applicationDeadlineDate}
          applicationMethod={applicationMethod}
        />

        <FavoriteItem
          jobId={postId}
          companyLocation={location}
          companyLogo={companyLogo}
          jobTitle={jobTitle}
          jobCategory={jobCategory}
          isFavorite={false}
        />
      </div>
    </div>
  );
};

export default IntroRight;
