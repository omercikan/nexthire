import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DrawerSearch from "./DrawerSearch";
import DrawerHeader from "./DrawerHeader";
import DrawerStatusFilter from "./DrawerStatusFilter";
import ApplicantSkeleton from "./ApplicantSkeleton";
import JobApplicantContent from "./JobApplicantContent";
import useApplicantsData from "./hooks/useApplicantsData";
import { useEffect, useRef, useState } from "react";
import ApplicationQuestions from "./ApplicationQuestions/ApplicationQuestions";
import { CurrentApplication } from "./types/applicantTypes";
import InterviewSchedulerDrawer from "./InterviewScheduler/InterviewSchedulerDrawer";

function DrawerWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#f3f5f8] h-full w-full sm:max-w-md fixed right-0 shadow-2xl drop-shadow-2xl flex flex-col"
    >
      {children}
    </motion.div>
  );
}

const JobApplicationsDrawer = ({
  jobId,
  applicationId,
  open,
  currentMenuAction,
}: {
  jobId: string;
  open: boolean;
  applicationId: string;
  currentMenuAction: string;
}) => {
  const router = useRouter();
  const {
    applicants,
    applicantsData,
    isFetching,
    isLoading,
    hasNextPage,
    setPage,
    updateApplicant,
  } = useApplicantsData();
  const hasApplicants = useRef(false);
  const [currentApplication, setCurrentApplication] =
    useState<CurrentApplication | null>(null);

  const handleCloseDrawer = () => {
    router.replace("/hesabim/islerim", { scroll: false });
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    if (!applicationId) return setCurrentApplication(null);

    const found = applicants?.find((a) => a._id === applicationId);

    if (found) {
      const {
        fullname,
        profilePhoto,
        title,
        lastWorkPlace,
        screeningQuestions,
      } = found;

      setCurrentApplication({
        fullname,
        profilePhoto,
        title,
        lastWorkPlace,
        screeningQuestions,
      });
    }
  }, [applicationId, applicants]);

  useEffect(() => {
    if (applicantsData && applicantsData.count > 0) {
      hasApplicants.current = true;
    }
  }, [applicantsData]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed right-0 top-0 bg-black/50 h-full w-full z-50 text-white"
          onClick={handleCloseDrawer}
        >
          <DrawerWrapper>
            <DrawerHeader handleCloseDrawer={handleCloseDrawer} jobId={jobId} />

            {hasApplicants.current && (
              <div className="px-5 py-4 border-b border-b-border">
                <DrawerSearch setPage={setPage} />
                <DrawerStatusFilter
                  statusCounts={applicantsData?.statusCounts}
                />
              </div>
            )}

            <div className="p-2 flex-1 visible-scrollbar">
              {!isLoading ? (
                <JobApplicantContent
                  updateApplicant={updateApplicant}
                  applicantsData={applicants}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  setPage={setPage}
                  hasNextPage={hasNextPage ?? false}
                />
              ) : (
                Array.from({ length: 5 }).map((_, i) => (
                  <ApplicantSkeleton key={i} />
                ))
              )}
            </div>
          </DrawerWrapper>

          <AnimatePresence mode="wait">
            {!!applicationId &&
              currentMenuAction === "questions" &&
              !!currentApplication &&
              !!currentApplication?.screeningQuestions.length && (
                <ApplicationQuestions applicant={currentApplication} />
              )}

            {!!applicationId &&
              currentMenuAction === "interview" &&
              !!currentApplication && (
                <InterviewSchedulerDrawer applicant={currentApplication} />
              )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationsDrawer;
