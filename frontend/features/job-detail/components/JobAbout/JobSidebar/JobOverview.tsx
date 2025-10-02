import React from "react";
import List from "./List";
import { ICONS } from "./icons";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { OverviewData } from "./sidebar.types";
dayjs.locale("tr");

const JobOverview = ({ overviewData }: { overviewData: OverviewData }) => {
  const {
    postedDate,
    applicationDeadline,
    careerLevel,
    educationLevel,
    experience,
    location,
    gender,
    salary,
  } = overviewData;

  const timestamp =
    postedDate?.seconds * 1000 + Math.floor(postedDate?.nanoseconds / 1000000);

  return (
    <aside className="bg-[#f5f7fc] p-[30px] max-[992px]:p-5 rounded-lg h-max mb-[30px]">
      <h2 className="text-lg text-[#202124] font-medium mb-[18px]">İş Özeti</h2>

      <List
        listItems={[
          {
            icon: ICONS.calendar,
            id: 1,
            text: "Yayınlanma tarihi",
            value: postedDate && dayjs(timestamp).format("DD MMMM YYYY"),
          },

          {
            icon: ICONS.location,
            id: 2,
            text: "Konum",
            value: location,
          },

          {
            icon: ICONS.money,
            id: 3,
            text: "Maaş",
            value: salary ?? "Belirtilmemiş",
          },

          {
            icon: ICONS.time,
            id: 4,
            text: "Son başvuru tarihi",
            value: dayjs(applicationDeadline).format("DD MMMM YYYY"),
          },

          {
            icon: ICONS.experience,
            id: 5,
            text: "Deneyim",
            value: experience,
          },

          {
            icon: ICONS.gender,
            id: 6,
            text: "Cinsiyet",
            value: gender ?? "Belirtilmemiş",
          },

          {
            icon: ICONS.qualification,
            id: 7,
            text: "Eğitim düzeyi",
            value: educationLevel?.join(" / "),
          },

          {
            icon: ICONS.level,
            id: 8,
            text: "Kariyer seviyesi",
            value: careerLevel,
          },
        ]}
      />
    </aside>
  );
};

export default JobOverview;
