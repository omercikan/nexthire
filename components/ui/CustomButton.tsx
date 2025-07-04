import { CustomButtonProps } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({
  isSubmitting = false,
  className,
  text,
  circularColor,
  handleClick
}: CustomButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`custom__button ${className ? className : ""}`}
      onClick={handleClick}
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
