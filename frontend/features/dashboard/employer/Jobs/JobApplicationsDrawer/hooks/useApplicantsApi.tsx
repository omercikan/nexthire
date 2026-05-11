import { useSearchParams } from "next/navigation";
import { useGetApplicantsQuery } from "../../services/applicantsApi";

interface RequestArgs {
  search?: string;
  status?: string;
  jobId: string;
  page: number;
}

const useApplicantsApi = ({ page }: { page: number }) => {
  const params = useSearchParams();
  const search = params.get("search") ?? "";
  const status = params.get("status") ?? "";
  const jobId = params.get("jobId") ?? "";

  const requestArgs: RequestArgs = { jobId, page };

  if (search) requestArgs.search = search;
  if (status) requestArgs.status = status;

  const {
    data: applicantsData,
    isLoading,
    isFetching,
  } = useGetApplicantsQuery(requestArgs, {
    skip: !jobId,
    refetchOnMountOrArgChange: true,
  });

  return { applicantsData, isLoading, isFetching, search, status };
};

export default useApplicantsApi;
