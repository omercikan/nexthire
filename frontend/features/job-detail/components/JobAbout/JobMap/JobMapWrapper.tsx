"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const LazyJobMap = dynamic(() => import("./JobMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[356px] bg-gray-200 rounded-lg animate-pulse" />
  ),
});

const JobMapWrapper = ({
  city,
  companyLogo,
}: {
  city: string;
  companyLogo: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true,});

  return (
    <div ref={ref}>
      {inView && <LazyJobMap city={city} companyLogo={companyLogo} />}
    </div>
  );
};

export default JobMapWrapper;
