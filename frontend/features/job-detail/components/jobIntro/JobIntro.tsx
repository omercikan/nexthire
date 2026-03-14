import Image from "next/image";
import { VscBriefcase } from "react-icons/vsc";
import { SlLocationPin } from "react-icons/sl";
import { BsClock } from "react-icons/bs";
import IntroLink from "./IntroLink";
import styles from "./info-dot.module.scss";
import PlaceholderCompanyLogo from "@/public/assets/company.png";
import { formatApplyTime } from "@/shared/utils/formatApplyTime";
import { JobIntroProps } from "@/shared/types/jobDetail";
import IntroRight from "./IntroSectionRight/IntroRight";

const JobIntro = (props: JobIntroProps) => {
  //* Current user *//
  // const { user } = useContext(AuthContext);

  //* Props data and isLoading *//

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
            src={props.companyLogo || PlaceholderCompanyLogo}
            alt={props.companyName}
            width={100}
            height={100}
            className="rounded-lg max-xl:w-25! max-xl:h-25!"
          />

          <div className="max-lg:text-center">
            <h1 className="text-[26px] text-[#202124] font-medium">
              {props.jobTitle}
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
                    text: props.category + ",",
                    href: "/is-ilanlari",
                  },
                  {
                    text: props.serviceArea[0],
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
                    text: props.location,
                  },
                ]}
              />

              <div className="flex gap-1.25">
                <BsClock size={20} color="696969" />
                <time className="text-sm text-[#696969]">
                  {formatApplyTime(props.datePosted)}
                </time>
              </div>

              {/* <div>
                <span className="text-sm text-[#696969]">
                  {props?.totalAppliedText}
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
                  text: props.modeOfWork,
                  linkClass:
                    "featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#1967d2] border-none !text-white cursor-pointer",
                },
                {
                  href: "/is-ilanlari",
                  text: props.positionLevel,
                  linkClass:
                    "featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#f49c00] border-none !text-[#1a1a1a] cursor-pointer",
                },
              ]}
            />
          </div>
        </div>

        <IntroRight
          postId={props.postId}
          jobTitle={props.jobTitle}
          location={props.location}
          jobCategory={props.category}
          companyLogo={props.companyLogo}
          applicationDeadlineDate={props.applicationDeadlineDate}
        />
        {/* {!props?.appliedData ? (
        ) : (
          <SubmittedResume
            resumeFileName={props.appliedData.fileName}
            resumeUrl={props.appliedData.resume}
          />
        )} */}
      </div>

      {/* {props?.appliedData && (
        <ApplicationTimeline statusList={props?.appliedData?.status} />
      )} */}
    </section>
  );
};

export default JobIntro;
