import { useJob } from "@/features/jobs/context/JobContext";
import dayjs from "dayjs";

const IntroDeadline = () => {
  const job = useJob();

  return (
    <>
      <div className="mb-3.75 max-lg:mt-3.75">
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
