import { useJob } from "@/features/jobs/context/JobContext";
import useJobStatus from "@/shared/hooks/useJobStatus";
import dayjs from "dayjs";
import { CiCalendar } from "react-icons/ci";

const IntroDeadline = () => {
  const { job } = useJob();
  const jobStatus = useJobStatus();

  return (
    <>
      <div className="mb-3.75 max-lg:mt-3.75 flex flex-col">
        {jobStatus === "draft" && (
          <div className="text-[#636363] rounded-full px-4 text-[15px] mb-4 self-end flex items-center gap-2">
            <CiCalendar strokeWidth={1} size={17} />
            Taslak
          </div>
        )}
        <p className="max-lg:text-center">
          <span>Son başvuru tarihi:</span>{" "}
          <time className="text-[#d32f2f] text-[15px] font-medium">
            {dayjs(job.createdAt).add(1, "month").format("DD MMMM YYYY")}
          </time>
        </p>
      </div>
    </>
  );
};

export default IntroDeadline;
