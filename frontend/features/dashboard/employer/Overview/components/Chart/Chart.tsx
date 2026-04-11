import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./Card";
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import ChartContainer from "./ChartContainer";

interface ChartProps {
  cardTitle: string;
  cardDescription: string;
  cartesianGridHorizontal: boolean;
  xAxis: XAxisProps;
  yAxis: YAxisProps;
  chart: React.ReactElement<{ children?: React.ReactNode }>;
}

const Chart: React.FC<ChartProps> = ({
  cardTitle,
  cardDescription,
  cartesianGridHorizontal,
  xAxis,
  yAxis,
  chart,
}) => {
  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="flex flex-col gap-3">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          {React.cloneElement(
            chart,
            {},
            ...React.Children.toArray(chart.props.children),
            <CartesianGrid
              key="grid"
              strokeDasharray="3 3"
              horizontal={cartesianGridHorizontal}
            />,
            <XAxis key="xaxis" {...xAxis} />,
            <YAxis key="yaxis" {...yAxis} />,
            <Tooltip
              key="tooltip"
              content={<CustomTooltip />}
              cursor={{
                stroke: "oklch(0.55 0.18 250)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />,
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};

export default Chart;
