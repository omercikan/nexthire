import { CustomButtonProps } from "@/shared/types";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({
  isSubmitting,
  className,
  text,
  type = "submit",
  circularColor,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className={`custom__button ${className ? className : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        handleClick?.();
      }}
    >
      {isSubmitting ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress
            size={23}
            sx={{ color: circularColor ? circularColor : "4045EF" }}
          />
        </Box>
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
