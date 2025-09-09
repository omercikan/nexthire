import React, { useContext } from "react";
import CardList from "./OverviewCard/CardList";
import { CARD_ICONS } from "./OverviewCard/card-icons";
import { AuthContext } from "@/context/authContext";
import { useGetUserStaticsQuery } from "@/lib/redux/services/dashboard/candidateStaticsApi";
import { Candidate } from "@/types/auth/models/candidate";
import BarChart from "./OverviewChart/BarChart";

const OverviewPage = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetUserStaticsQuery({ candidateId: user?.id as string });
  const candidateUser = user as Candidate;

  return (
    <div>
      <CardList
        cards={[
          {
            cardId: 1,
            backgroundColor: "#FFF5D9",
            textColor: "#FFBB38",
            cardTitle: "Başvurulan İşler",
            cardText: data?.appliedJobCount ?? "0",
            icon: CARD_ICONS.appliedJobs,
          },

          {
            cardId: 2,
            backgroundColor: "#E7EDFF",
            textColor: "#396AFF",
            cardTitle: "İnceleme",
            cardText: "0",
            icon: CARD_ICONS.review,
          },

          {
            cardId: 3,
            backgroundColor: "#FFE0EB",
            textColor: "#FF82AC",
            cardTitle: "Görüntülenme",
            cardText: "0",
            icon: CARD_ICONS.views,
          },

          {
            cardId: 4,
            backgroundColor: "#DCFAF8",
            textColor: "#16DBCC",
            cardTitle: "Favoriler",
            cardText:
              candidateUser?.favoriteJobs?.length +
                candidateUser?.favoriteEmployers?.length || "0",
            icon: CARD_ICONS.favorite,
          },
        ]}
      />

      <div className="flex flex-wrap gap-[30px] mt-[24px]">
        <BarChart />
      </div>
    </div>
  );
};

export default OverviewPage;
