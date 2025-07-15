import React from "react";
import ResumeItem from "../ResumeItem";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { calculateCVSize } from "@/lib/utils/calculateCvSize";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const PdfLoadingOverlay = () => {
  const { fileName, size, uploadTime } = useSelector(
    (state: RootState) => state.applicationModalData.placeholderUploadData
  );

  return (
    <div className="relative">
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          zIndex: 10,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <CircularProgress
          sx={{ color: "#99a1af" }}
          size={30}
          aria-label="Loading PDF"
          data-testid="Loading PDF"
        />
      </Box>

      <div className="opacity-70">
        <ResumeItem
          resume={{
            fileName,
            size: calculateCVSize(size),
            uploadTime,
            createdAt: "",
            cvID: "",
            url: "",
          }}
        />
      </div>
    </div>
  );
};

export default PdfLoadingOverlay;
