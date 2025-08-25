import Image from "next/image";
import React, { useContext } from "react";
import { VscBriefcase } from "react-icons/vsc";
import { SlLocationPin } from "react-icons/sl";
import { BsClock } from "react-icons/bs";
import IntroLink from "./IntroLink";
import { JobIntroInterface } from "@/types/jobDetail";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import { Typography } from "@mui/material";
import { useGetApplicationQuery } from "@/lib/redux/services/jobApplicationApi";
import { AuthContext } from "@/context/authContext";
import { formatApplyTime } from "@/lib/utils/formatApplyTime";
import styles from "./info-dot.module.scss";
import IntroRight from "./IntroSectionRight/IntroRight";
import SubmittedResume from "./PostApplication/SubmittedResume";
import ApplicationTimeline from "./PostApplication/ApplicationStatus/ApplicationTimeline";

const JobIntro = (props: JobIntroInterface) => {
  //* Current user *//
  const { user } = useContext(AuthContext);

  //* Props data and isLoading *//
  const isLoading = props.isLoading;
  const {
    applicationDeadlineDate,
    category,
    companyName,
    companyLogo,
    jobTitle,
    location,
    modeOfWork,
    positionLevel,
    serviceArea,
    datePosted,
    numberOfEmployees,
    postId,
  } = props.data;

  //* Application status data *//
  const {
    data,
    isLoading: isApplyLoading,
    isFetching,
  } = useGetApplicationQuery({
    candidateId: user?.id ?? "",
    postId: postId,
  });

  return (
    <section className="bg-[#F2F5FC] py-[70px] mt-[79.43px]">
      <div
        className={`container flex gap-x-[60px] max-lg:flex-col justify-between ${
          data?.appliedData ? "" : "items-center"
        }`}
      >
        <div className="flex max-lg:flex-col items-center gap-5">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={companyName}
              width={100}
              height={100}
              className="rounded-lg max-xl:!w-[100px] max-xl:!h-[100px]"
            />
          ) : (
            <LoaderSkeleton
              animationType="pulse"
              length={1}
              variant="circular"
              sxClass={{
                borderRadius: "50%",
                height: "100px",
                width: "100px",
              }}
            />
          )}

          <div className="max-lg:text-center">
            {jobTitle ? (
              <h1 className="text-[26px] text-[#202124] font-medium">
                {jobTitle}
              </h1>
            ) : (
              <Typography variant="h1">
                <LoaderSkeleton
                  animationType="wave"
                  length={1}
                  variant="text"
                  sxClass={{
                    borderRadius: "4px",
                    width: "250px",
                    height: "30px",
                  }}
                  className="max-lg:mx-auto"
                />
              </Typography>
            )}

            <div
              className={`flex items-center flex-wrap max-lg:justify-center gap-x-4 gap-y-[8px] mt-[5px] ${styles.infoDot}`}
            >
              <IntroLink
                JobLocationFilterStatus={{
                  isApplyJob: true,
                  isApplyLocation: false,
                }}
                isLoading={isLoading}
                icon={<VscBriefcase size={20} color="696969" />}
                link={[
                  {
                    text: category + ",",
                    href: "/is-ilanlari",
                  },
                  {
                    text: serviceArea,
                    href: "/is-ilanlari",
                  },
                ]}
              />

              <IntroLink
                JobLocationFilterStatus={{
                  isApplyJob: false,
                  isApplyLocation: true,
                }}
                isLoading={isLoading}
                icon={<SlLocationPin size={20} color="696969" />}
                link={[
                  {
                    href: "/is-ilanlari",
                    text: location,
                  },
                ]}
              />

              {isLoading ? (
                <Typography variant="subtitle1">
                  <LoaderSkeleton
                    testID="time-skeleton"
                    animationType="wave"
                    length={1}
                    variant="text"
                    sxClass={{
                      borderRadius: "4px",
                      width: "100px",
                      height: "25px",
                    }}
                  />
                </Typography>
              ) : (
                <div className="flex gap-[5px]">
                  <BsClock size={20} color="696969" />
                  <time className="text-sm text-[#696969]">
                    {formatApplyTime(
                      datePosted?.seconds * 1000 +
                        datePosted?.nanoseconds / 1000000
                    )}
                  </time>
                </div>
              )}

              {isLoading ? (
                <Typography variant="subtitle1">
                  <LoaderSkeleton
                    testID="time-skeleton"
                    animationType="wave"
                    length={1}
                    variant="text"
                    sxClass={{
                      borderRadius: "4px",
                      width: "100px",
                      height: "25px",
                    }}
                  />
                </Typography>
              ) : (
                <div>
                  <span className="text-sm text-[#696969]">
                    {data?.totalAppliedText}
                  </span>
                </div>
              )}
            </div>

            <IntroLink
              JobLocationFilterStatus={{
                isApplyJob: false,
                isApplyLocation: false,
              }}
              isLoading={isLoading}
              wrapperClass="mt-3 flex max-lg:justify-center gap-[15px]"
              link={[
                {
                  href: "/is-ilanlari",
                  text: modeOfWork,
                  linkClass:
                    "featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#1967d2] border-none !text-white cursor-pointer",
                },
                {
                  href: "/is-ilanlari",
                  text: positionLevel,
                  linkClass:
                    "featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#f49c00] border-none !text-[#1a1a1a] cursor-pointer",
                },
              ]}
            />
          </div>
        </div>

        {isApplyLoading || isFetching || isLoading ? (
          ""
        ) : !data?.appliedData ? (
          <IntroRight
            postId={postId}
            jobTitle={jobTitle}
            location={location}
            isLoading={isLoading}
            companyLogo={companyLogo}
            companyName={companyName}
            numberOfEmployees={numberOfEmployees}
            applicationDeadlineDate={applicationDeadlineDate}
          />
        ) : (
          <SubmittedResume
            resumeFileName={data.appliedData.fileName}
            resumeUrl={data.appliedData.resume}
          />
        )}
      </div>

      {data?.appliedData && (
        <ApplicationTimeline statusList={data?.appliedData?.status} />
      )}
    </section>
  );
};

export default JobIntro;
