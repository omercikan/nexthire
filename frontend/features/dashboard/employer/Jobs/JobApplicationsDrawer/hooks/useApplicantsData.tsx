import { useEffect, useState } from "react";
import { useGetApplicantsQuery } from "../../services/applicantsApi";
import { useSearchParams } from "next/navigation";
import { Applicant } from "../types/applicantTypes";

const useApplicantsData = () => {
  const [page, setPage] = useState(1);
  const jobId = useSearchParams().get("jobId") ?? "";
  const {
    data: applicantsData,
    isLoading,
    isFetching,
  } = useGetApplicantsQuery({ jobId, page }, { skip: !jobId });
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    setApplicants([]);
    setPage(1);
  }, [jobId]);

  useEffect(() => {
    if (applicantsData?.data) {
      setApplicants((prev) => {
        const newItems = applicantsData.data.filter(
          (item) => !prev.some((p) => p._id === item._id),
        );

        return [...prev, ...newItems];
      });
    }
  }, [applicantsData?.data]);

  return {
    applicants,
    hasNextPage: applicantsData?.hasNextPage,
    isLoading,
    isFetching,
    page,
    setPage,
    setApplicants,
  };
};

export default useApplicantsData;
