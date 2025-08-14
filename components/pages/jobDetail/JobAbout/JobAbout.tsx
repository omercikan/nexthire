import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import JobRequirements from "./JobRequirements";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ShareMobile from "./SharePost/ShareMobile";

export interface JobAbout {
  about: {
    description: string;
    responsibilities: string[];
    requirements: string[];
  };
}

const JobDescription = dynamic(() => import("./JobDescription"), {
  ssr: false,
});

const JobResponsibilities = dynamic(() => import("./JobResponsibilities"), {
  ssr: false,
});

const ShareDesktop = dynamic(() => import("./SharePost/ShareDesktop"), {
  ssr: false,
});

const JobAbout = ({ about }: JobAbout) => {
  const jobTitle = useSelector(
    (state: RootState) => state.jobDetail.jobDetail.jobTitle
  );
  const { description, responsibilities, requirements } = about;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize();
    };
  }, []);

  return (
    <div className="py-[50px] max-[992px]:py-[25px]">
      <article className="container">
        {description && <JobDescription description={description} />}

        {responsibilities && (
          <JobResponsibilities responsibilities={responsibilities} />
        )}

        {requirements && <JobRequirements requirements={requirements} />}
      </article>

      <div className="container">
        {!isMobile ? (
          jobTitle && <ShareDesktop jobTitle={jobTitle} />
        ) : (
          <ShareMobile />
        )}
      </div>
    </div>
  );
};

export default memo(JobAbout);
