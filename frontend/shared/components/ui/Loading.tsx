"use client";

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full h-full grid place-content-center">
      {isClient ? <CircularProgress size={65} sx={{ color: "#4045ef" }} /> : ""}
    </div>
  );
};

export default Loading;
