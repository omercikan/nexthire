import JobDetailWrapper from "@/features/job-detail/components/JobDetailClientWrapper";
import { Usable, use } from "react";

interface JobDetailProps {
  params: Usable<{
    slug: string[];
  }>;
}

const JobDetail = ({ params }: JobDetailProps) => {
  const { slug } = use(params);
  const [jobId] = slug;

  const res = use(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`, {
      cache: "no-store",
    }),
  );

  if (!res.ok) return <h1>İş ilanı bulunamadı</h1>;

  const data = use(res.json());

  return <JobDetailWrapper job={data.job} />;
};

export default JobDetail;
