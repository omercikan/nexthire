import React, { useEffect, useState } from "react";
import JobRequirements from "./JobRequirements";
import TailwindSkeleton from "@/components/ui/TailwindSkeleton";
import JobDescription from "./JobDescription";
import JobResponsibilities from "./JobResponsibilities";
import ShareDesktop from "./SharePost/ShareDesktop";
import ShareMobile from "./SharePost/ShareMobile";

export interface JobAbout {
  about: {
    description: string;
    responsibilities: string[];
    requirements: string[];
  };
  jobTitle: string;
}

const JobAbout = ({ about, jobTitle }: JobAbout) => {
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
    <div className="flex-[66.7%] max-lg:flex-none">
      <article>
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
              dynamicWidths={["85%", "80%", "75%", "70%"]}
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

      <div>
        {isMobile ? (
          <ShareMobile jobTitle={jobTitle} />
        ) : (
          <ShareDesktop jobTitle={jobTitle} />
        )}
      </div>
    </div>
  );
};

export default JobAbout;
