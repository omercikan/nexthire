import CustomButton from "@/components/ui/CustomButton";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import { Typography } from "@mui/material";
import React from "react";

const JobApplication = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading ? (
        <Typography variant="button">
          <LoaderSkeleton
            animationType="wave"
            length={1}
            variant="rectangular"
            sxClass={{
              borderRadius: "8px",
              height: "50px",
              width: "215.5px",
            }}
          />
        </Typography>
      ) : (
        <CustomButton
          text="Şimdi Başvur"
          isSubmitting={false}
          className="w-full !rounded-lg px-16 whitespace-nowrap"
        />
      )}
    </>
  );
};

export default JobApplication;
