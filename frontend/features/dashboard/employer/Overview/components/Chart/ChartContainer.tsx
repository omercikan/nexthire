import { cn } from "@/shared/libs/utils";
import React from "react";
import * as RechartsPrimitive from "recharts";

const ChartContainer = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

export default ChartContainer;
