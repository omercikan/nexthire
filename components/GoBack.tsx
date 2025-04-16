"use client";

import { GoBackProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = ({ icon, position }: GoBackProps) => {
  const router = useRouter();

  return (
    <div
      className={`absolute max-[1026px]:top-12 max-[1026px]:right-6 rounded-full z-30 ${
        position ? position : ""
      }`}
    >
      <button onClick={() => router.back()}>{icon}</button>
    </div>
  );
};

export default GoBack;
