import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DrawerSearch from "./DrawerSearch";
import DrawerHeader from "./DrawerHeader";
import DrawerStatusFilter from "./DrawerStatusFilter";
import ApplicantSkeleton from "./ApplicantSkeleton";
import JobApplicantContent from "./JobApplicantContent";
import useApplicantsData from "./hooks/useApplicantsData";

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
  open,
}: {
  jobId: string;
  open: boolean;
}) => {
  const router = useRouter();
  const { applicants, isFetching, isLoading, hasNextPage, setPage } =
    useApplicantsData();

  const handleCloseDrawer = () => {
    router.replace("/hesabim/islerim", { scroll: false });
    document.body.style.overflow = "visible";
  };

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

            {(isLoading || applicants.length > 0) && (
              <div className="px-5 py-4 border-b border-b-border">
                <DrawerSearch />
                <DrawerStatusFilter />
              </div>
            )}

            <div className="p-2 flex-1 visible-scrollbar">
              {!isLoading ? (
                <JobApplicantContent
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationsDrawer;
