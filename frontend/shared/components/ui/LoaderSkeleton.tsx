import { Skeleton, SxProps } from "@mui/material";
import React from "react";

const LoaderSkeleton = ({
  animationType,
  variant,
  sxClass,
  length,
  extraSxClass,
  className,
  testID,
}: {
  animationType: false | "pulse" | "wave" | undefined;
  variant: "text" | "rectangular" | "rounded" | "circular";
  sxClass?: {
    borderRadius: string;
    width: string;
    height: string;
  };
  length: number;
  extraSxClass?: SxProps;
  className?: string;
  testID?: string;
}) => {
  const placeholderLoader = Array.from({ length }, (_, i) => i);

  return placeholderLoader.map((_, i) => (
    <Skeleton
      data-testid={testID}
      key={i}
      className={className ?? ""}
      animation={animationType}
      variant={variant}
      sx={{
        borderRadius: sxClass?.borderRadius,
        width: sxClass?.width,
        height: sxClass?.height,
        ...extraSxClass,
      }}
    />
  ));
};

export default LoaderSkeleton;
