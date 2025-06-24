"use client";

import { useGetJobDetailQuery } from "@/lib/redux/services/jobDetail";
import { useParams } from "next/navigation";
import React from "react";

const JobDetail = () => {
  const { slug } = useParams();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { data, isLoading } = useGetJobDetailQuery({
    postID: String(
      slug
        ?.toString()
        .split("-")
        .at(slug.toString().split("-").length - 1)
    ),
  });

  return <div>JobDetail</div>;
};

export default JobDetail;
