import { useEffect, useState } from "react";
import JobDescription from "./JobDescription";
import ShareDesktop from "./SharePost/ShareDesktop";
import ShareMobile from "./SharePost/ShareMobile";

export interface JobAbout {
  about: string;
  jobTitle: string;
}

const JobAbout = ({ about, jobTitle }: JobAbout) => {
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
        <JobDescription description={about} />
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
