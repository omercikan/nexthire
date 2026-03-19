"use client";

import { useJob } from "@/features/jobs/context/JobContext";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const JobMap = dynamic(() => import("./JobMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-100 max-[1200px]:h-62.5 max-[1200px]:mt-6.25 bg-gray-200 mt-12.5 animate-pulse" />
  ),
});

const JobMapWrapper = () => {
  const {
    employer: { city, profilePhoto },
  } = useJob();
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {inView && <JobMap city={city} companyLogo={profilePhoto} />}
    </div>
  );
};

export default JobMapWrapper;
