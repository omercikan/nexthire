import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Applicant } from "../types/applicantTypes";
import useApplicantsApi from "./useApplicantsApi";

const useApplicantsData = () => {
  const [page, setPage] = useState(1);
  const jobId = useSearchParams().get("jobId") ?? "";

  const { applicantsData, search, status, isFetching, isLoading } =
    useApplicantsApi({ page });
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const isResetting = useRef(false);

  useEffect(() => {
    setApplicants([]);
    setPage(1);
  }, [jobId]);

  useEffect(() => {
    isResetting.current = true;
    setApplicants([]);
    setPage(1);
  }, [search, status]);

  useEffect(() => {
    if (applicantsData?.data) {
      if (isResetting.current) {
        isResetting.current = false;
        setApplicants(applicantsData.data);
        return;
      }

      setApplicants((prev) => {
        const newItems = applicantsData.data.filter(
          (item) => !prev.some((p) => p._id === item._id),
        );

        return [...prev, ...newItems];
      });
    }
  }, [applicantsData?.data]);

  const updateApplicant = useCallback(
    (updated: Applicant) => {
      setApplicants((prev) =>
        prev
          .map((a) => (a._id === updated._id ? updated : a))
          .filter((a) => {
            if (!status) return true;
            if (status === "new") return true;
            return a.currentStatus === status;
          }),
      );
    },
    [status],
  );

  return {
    applicants,
    hasNextPage: applicantsData?.hasNextPage,
    applicantsData,
    isLoading,
    isFetching,
    page,
    setPage,
    setApplicants,
    updateApplicant,
  };
};

export default useApplicantsData;
