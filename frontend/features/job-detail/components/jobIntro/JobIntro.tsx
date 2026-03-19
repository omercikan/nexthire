import Image from "next/image";
import { VscBriefcase } from "react-icons/vsc";
import { SlLocationPin } from "react-icons/sl";
import { BsClock } from "react-icons/bs";
import IntroLink from "./IntroLink";
import styles from "./info-dot.module.scss";
import PlaceholderCompanyLogo from "@/public/assets/company.png";
import { formatApplyTime } from "@/shared/utils/formatApplyTime";
import IntroRight from "./IntroSectionRight/IntroRight";
import { useJob } from "@/features/jobs/context/JobContext";

const JobIntro = () => {
  const job = useJob();

  //* Current user *//
  // const { user } = useContext(AuthContext);

  //* job data and isLoading *//

  //* Application status data *//
  // const {
  //   data,
  //   isLoading: isApplyLoading,
  //   isFetching,
  // } = useGetApplicationQuery({
  //   candidateId: user?._id ?? "",
  //   postId: postId,
  // });

  return (
    <section className="bg-[#F2F5FC] py-17.5 mt-[79.43px]">
      <div className="container flex gap-x-15 max-lg:flex-col justify-between">
        <div className="flex max-lg:flex-col items-center gap-5">
          <Image
            src={job.employer.profilePhoto || PlaceholderCompanyLogo}
            alt={job.employer.companyName}
            width={100}
            height={100}
            className="rounded-lg max-xl:w-25! max-xl:h-25!"
          />

          <div className="max-lg:text-center">
            <h1 className="text-[26px] text-[#202124] font-medium">
              {job.jobTitle}
            </h1>

            <div
              className={`flex items-center flex-wrap max-lg:justify-center gap-x-4 gap-y-2 mt-1.25 ${styles.infoDot}`}
            >
              <IntroLink
                JobLocationFilterStatus={{
                  isApplyJob: true,
                  isApplyLocation: false,
                }}
                icon={<VscBriefcase size={20} color="696969" />}
                link={[
                  {
                    text: job.category + ",",
                    href: "/is-ilanlari",
                  },
                  {
                    text: job.employer.categories[0],
                    href: "/is-ilanlari",
                  },
                ]}
              />

              <IntroLink
                JobLocationFilterStatus={{
                  isApplyJob: false,
                  isApplyLocation: true,
                }}
                icon={<SlLocationPin size={20} color="696969" />}
                link={[
                  {
                    href: "/is-ilanlari",
                    text: job.location,
                  },
                ]}
              />

              <div className="flex gap-1.25">
                <BsClock size={20} color="696969" />
                <time className="text-sm text-[#696969]">
                  {formatApplyTime(job.createdAt)}
                </time>
              </div>

              {/* <div>
                <span className="text-sm text-[#696969]">
                  {job?.totalAppliedText}
                </span>
              </div> */}
            </div>

            <IntroLink
              JobLocationFilterStatus={{
                isApplyJob: false,
                isApplyLocation: false,
              }}
              wrapperClass="mt-3 flex max-lg:justify-center gap-[15px]"
              link={[
                {
                  href: "/is-ilanlari",
                  text: job.workType,
                  linkClass:
                    "featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#1967d2] border-none !text-white cursor-pointer",
                },
                {
                  href: "/is-ilanlari",
                  text: job.careerLevel,
                  linkClass:
                    "featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#f49c00] border-none !text-[#1a1a1a] cursor-pointer",
                },
              ]}
            />
          </div>
        </div>

        <IntroRight />
        {/* {!job?.appliedData ? (
        ) : (
          <SubmittedResume
            resumeFileName={job.appliedData.fileName}
            resumeUrl={job.appliedData.resume}
          />
        )} */}
      </div>

      {/* {job?.appliedData && (
        <ApplicationTimeline statusList={job?.appliedData?.status} />
      )} */}
    </section>
  );
};

export default JobIntro;
