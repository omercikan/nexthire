"use client";

import JobIntro from "@/components/pages/jobDetail/jobIntro/JobIntro";
import { useGetJobDetailQuery } from "@/lib/redux/services/jobDetail";
import { Timestamp } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

const JobDetail = () => {
  const params = useSearchParams();
  const { data, isLoading } = useGetJobDetailQuery({
    postID: atob(params.get("jpi") as string),
    companyID: atob(params.get("jci") as string),
  });

  return (
    <main>
      <Toaster position="top-right" />
      <JobIntro
        data={{
          applicationDeadlineDate: data?.job?.applicationDeadlineDate ?? "",
          category: data?.job.category ?? "",
          companyLogo: data?.job.companyLogo ?? "",
          companyName: data?.job.companyName ?? "",
          jobTitle: data?.job.jobTitle ?? "",
          location: data?.job.location ?? "",
          modeOfWork: data?.job.modeOfWork ?? "",
          positionLevel: data?.job.positionLevel ?? "",
          serviceArea: data?.job.serviceArea ?? "",
          datePosted: data?.job.datePosted as Timestamp,
          numberOfEmployees: data?.job.numberOfEmployees ?? "",
          postId: data?.job.postId ?? "",
        }}
        isLoading={isLoading}
      />
    </main>
  );
};

export default JobDetail;
