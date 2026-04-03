import List from "./List";
import { ICONS } from "./icons";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { useJob } from "@/features/jobs/context/JobContext";
dayjs.locale("tr");

const JobOverview = () => {
  const { job } = useJob();

  return (
    <aside className="bg-[#f5f7fc] p-7.5 max-[992px]:p-5 rounded-lg h-max mb-7.5">
      <h2 className="text-lg text-[#202124] font-medium mb-4.5">İş Özeti</h2>

      <List
        listItems={[
          {
            icon: ICONS.calendar,
            id: 1,
            text: "Yayınlanma tarihi",
            value: dayjs(job.createdAt).format("DD MMMM YYYY"),
          },

          {
            icon: ICONS.location,
            id: 2,
            text: "Konum",
            value: job.jobLocation ?? "Belirtilmemiş",
          },

          {
            icon: ICONS.money,
            id: 3,
            text: "Maaş",
            value: job.salaryPeriod ?? "Belirtilmemiş",
          },

          {
            icon: ICONS.time,
            id: 4,
            text: "Son başvuru tarihi",
            value: dayjs(job.createdAt).add(1, "month").format("DD MMMM YYYY"),
          },

          {
            icon: ICONS.experience,
            id: 5,
            text: "Deneyim",
            value: job.experience ?? "",
          },

          {
            icon: ICONS.gender,
            id: 6,
            text: "Cinsiyet",
            value: job.gender ?? "Belirtilmemiş",
          },

          {
            icon: ICONS.qualification,
            id: 7,
            text: "Eğitim düzeyi",
            value: job.educationLevel ?? "",
          },

          {
            icon: ICONS.level,
            id: 8,
            text: "Kariyer seviyesi",
            value: job.careerLevel ?? "",
          },
        ]}
      />
    </aside>
  );
};

export default JobOverview;
