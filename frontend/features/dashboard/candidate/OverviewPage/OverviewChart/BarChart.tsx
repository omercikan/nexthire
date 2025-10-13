import React, { useContext } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { AuthContext } from "@/features/auth/authContext";
import { MOTNHS } from "./months";
import ChartHeader from "./ChartHeader";
import { useMediaQuery } from "@mui/material";
import { useGetCandidateProfileViewsQuery } from "@/features/dashboard/services/userViewsApi";

const barColors = ["#1A16F3", "#FCAA0B"];

export default function ViewerBars() {
  //* Get authenticated user from context *\\
  const { user } = useContext(AuthContext);

  //* Fetch profile view data for the current user *\\
  const { data } = useGetCandidateProfileViewsQuery(user?._id as string, {
    skip: !user?._id,
  });

  //* Extract monthly view counts and calculate total views *\\
  const viewData = data?.candidateViews?.views?.map(({ view }) => Number(view));
  const totalView = viewData?.reduce((acc, current) => acc + current, 0);

  //* Determine chart layout based on screen size (responsive) *\\
  const isMobile = useMediaQuery("(max-width:640px)");
  const layout = isMobile ? "horizontal" : "vertical";

  return (
    <div className="flex-[730px]">
      <h2 className="font-semibold text-[22px] text-[#333B69]">
        Profil Görünürlüğü Özeti
      </h2>

      <div className="w-full bg-white rounded-[25px] mt-[20px]">
        <ChartHeader totalView={totalView as number} />

        <BarChart
          layout={layout}
          borderRadius={10}
          series={[
            {
              data: viewData ?? [0],
              id: "viewId",
              valueFormatter: (value, { dataIndex }) =>
                `${MOTNHS[dataIndex]} ayında ${value ?? 0} kişi sizi fark etti`,
            },
          ]}
          yAxis={
            layout === "horizontal"
              ? [
                  {
                    data: MOTNHS,
                    categoryGapRatio: 0.3,
                    barGapRatio: 0.1,
                    scaleType: "band",
                    colorMap: {
                      type: "ordinal",
                      values: MOTNHS,
                      colors: barColors,
                    },
                  },
                ]
              : undefined
          }
          xAxis={
            layout === "vertical"
              ? [
                  {
                    data: MOTNHS,
                    categoryGapRatio: 0.3,
                    barGapRatio: 0.1,
                    scaleType: "band",
                    colorMap: {
                      type: "ordinal",
                      values: MOTNHS,
                      colors: barColors,
                    },
                  },
                ]
              : undefined
          }
          height={layout === "horizontal" ? 500 : 300}
        />
      </div>
    </div>
  );
}
