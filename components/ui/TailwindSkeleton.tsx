import React from "react";

type TWAnimation = {
  length: number;
  dynamicWidths?: string[];
  className?: string;
  animationClass?: string;
};

const TailwindSkeleton = ({
  length,
  dynamicWidths,
  className,
  animationClass,
}: TWAnimation) => {
  const animationLength = Array.from({ length }, (_, i) => i);

  return (
    <div className={className ?? ""}>
      {animationLength.map((_, i) => (
        <div
          key={i}
          className={`${animationClass ?? ""} animate-pulse`}
          style={{ width: dynamicWidths?.[i] ?? "" }}
        />
      ))}
    </div>
  );
};

export default TailwindSkeleton;
