import JobDetailWrapper from "@/features/job-detail/components/JobDetailClientWrapper";
import { jobDetailApi } from "@/shared/redux/services/jobDetail";
import { store } from "@/shared/redux/store";

const JobDetail = async (props: { params: Promise<{ slug: string[] }> }) => {
  const params = await props.params;
  const [, postID, companyID] = params.slug;

  const result = await store
    .dispatch(
      jobDetailApi.endpoints.getJobDetail.initiate({ companyID, postID })
    )
    .unwrap();

  return <JobDetailWrapper job={result.job} />;
};

export default JobDetail;
