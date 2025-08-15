import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import JobRequirements from "./JobRequirements";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import TailwindSkeleton from "@/components/ui/TailwindSkeleton";

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

const ShareMobile = dynamic(() => import("./SharePost/ShareMobile"), {
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
        {description ? (
          <JobDescription description={description} />
        ) : (
          <>
            <TailwindSkeleton
              length={1}
              className="mb-5"
              animationClass="bg-[#E3E3E3] h-[10px] rounded-full w-[120px]"
            />

            <TailwindSkeleton
              length={4}
              dynamicWidths={["100%", "75%", "83.3333", "50%"]}
              className="flex flex-col gap-3"
              animationClass="bg-[#E3E3E3] h-[10px] rounded-full"
            />
          </>
        )}

        {responsibilities ? (
          <JobResponsibilities responsibilities={responsibilities} />
        ) : (
          <>
            <TailwindSkeleton
              length={1}
              className="mb-5 mt-[50px]"
              animationClass="bg-[#E3E3E3] h-[10px] rounded-full w-[200px]"
            />

            <TailwindSkeleton
              length={3}
              dynamicWidths={["352px", "246px", "294px"]}
              className="mb-5 flex flex-col gap-3"
              animationClass="bg-[#E3E3E3] h-[10px] rounded-full"
            />
          </>
        )}

        {requirements ? (
          <JobRequirements requirements={requirements} />
        ) : (
          <>
            <TailwindSkeleton
              length={1}
              className="mb-5 mt-[50px]"
              animationClass="bg-[#E3E3E3] h-[10px] rounded-full w-[169px]"
            />

            <TailwindSkeleton
              length={3}
              dynamicWidths={["333px", "201px", "228px"]}
              className="mb-5 flex flex-col gap-3"
              animationClass="bg-[#E3E3E3] h-[10px] rounded-full"
            />
          </>
        )}
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
