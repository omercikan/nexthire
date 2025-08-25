import JobDetailWrapper from "@/components/pages/jobDetail/JobDetailClientWrapper";
import { jobDetailApi } from "@/lib/redux/services/jobDetail";
import { store } from "@/lib/redux/store";

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
