import Image from "next/image";
import { Applicant } from "./types/applicantTypes";
import {
  LuCalendar,
  LuClipboardList,
  LuFileText,
  LuStar,
  LuUser,
} from "react-icons/lu";
import ApplicationStatus from "./ApplicationStatus";
import { formatApplyTime } from "@/shared/utils/formatApplyTime";
import ApplicationActionButton from "./ApplicationActionButton";
import { GoXCircle } from "react-icons/go";
import EmptyApplicants from "./EmptyApplicants";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

interface JobApplicantContentProps {
  applicantsData: Applicant[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasNextPage: boolean;
}

const JobApplicantContent = ({
  applicantsData,
  setPage,
  isLoading,
  isFetching,
  hasNextPage,
}: JobApplicantContentProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px",
  });
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!inView) {
      triggeredRef.current = false;
      return;
    }

    if (triggeredRef.current) return;

    if (hasNextPage && !isFetching) {
      triggeredRef.current = true;
      setPage((p) => p + 1);
    }
  }, [inView, hasNextPage, isFetching, setPage]);

  if (!isLoading && applicantsData?.length === 0) {
    return <EmptyApplicants />;
  }

  return (
    <>
      {applicantsData?.map((item) => {
        return (
          <div
            key={item._id}
            className="p-3 flex gap-3 border border-transparent hover:border-border rounded-[10px] transition-colors min-w-0"
          >
            {item.profilePhoto ? (
              <Image
                src={item.profilePhoto}
                alt={item.fullname}
                width={36}
                height={36}
                className="rounded-full self-start shrink-0"
              />
            ) : (
              <div className="border border-border rounded-full w-9 h-9 text-gray-600 grid place-content-center">
                <LuUser size={20} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <strong className="text-foreground font-medium text-sm truncate">
                  {item.fullname}
                </strong>

                <ApplicationStatus
                  createdAt={item.createdAt}
                  status={item.status}
                />
              </div>

              <p className="text-muted-foreground text-xs truncate">
                {item.title}{" "}
                {item.lastWorkPlace ? `@ ${item.lastWorkPlace}` : null}
              </p>

              <div className="text-muted-foreground text-[11px] mt-1 flex items-center gap-2">
                {item.experienceTime && (
                  <span className="shrink-0">
                    {item.experienceTime} yıl deneyim
                  </span>
                )}

                {item.experienceTime && item.createdAt && (
                  <span className="text-border shrink-0">•</span>
                )}

                <span className="shrink-0">
                  {formatApplyTime(item.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex ms-auto gap-4 shrink-0">
              {!!item.screeningQuestions.length && (
                <ApplicationActionButton
                  icon={LuClipboardList}
                  tooltip="Cevapları Gör"
                  className="hover:text-[#0073d5]!"
                />
              )}

              <ApplicationActionButton
                icon={LuFileText}
                tooltip="CV Görüntüle"
                className="hover:text-[#0073d5]!"
                onClick={() => item.resume?.url && window.open(item.resume.url)}
              />

              <ApplicationActionButton
                icon={LuStar}
                tooltip="Kısa Listeye Al"
                className="hover:text-[#009966]!"
              />

              <ApplicationActionButton
                icon={LuCalendar}
                tooltip="Mülakata Al"
                className="hover:text-[#4f39f6]!"
              />

              <ApplicationActionButton
                icon={GoXCircle}
                tooltip="Reddet"
                className="hover:text-[#fb2c36]!"
              />
            </div>
          </div>
        );
      })}

      <div ref={ref} className="h-1" />

      {isFetching && (
        <div className="flex justify-center py-3">
          <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
};

export default JobApplicantContent;
