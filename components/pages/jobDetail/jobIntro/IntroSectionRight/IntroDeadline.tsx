import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import { Typography } from "@mui/material";
import React from "react";

const IntroDeadline = ({
  isLoading,
  applicationDeadlineDate,
}: {
  applicationDeadlineDate: string;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Typography>
          <LoaderSkeleton
            animationType="wave"
            variant="text"
            length={1}
            sxClass={{
              borderRadius: "4px",
              height: "25px",
              width: "200px",
            }}
            className="max-lg:mx-auto max-lg:!mt-[15px]"
            extraSxClass={{
              marginBottom: "15px",
            }}
          />
        </Typography>
      ) : (
        <div className="mb-[15px] max-lg:mt-[15px]">
          <p className="max-lg:text-center">
            <span>Son başvuru tarihi:</span>{" "}
            <time className="text-[#e44343] text-[15px] font-medium">
              {new Date(applicationDeadlineDate).toLocaleDateString("tr", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
      )}
    </>
  );
};

export default IntroDeadline;
