import { GoBackProps } from "@/types";
import Link from "next/link";
import React from "react";

const GoBack = ({ icon, url, position }: GoBackProps) => {
  return (
    <div
      className={`absolute max-[1026px]:top-12 max-[1026px]:right-6 rounded-full z-30 ${
        position ? position : ""
      }`}
    >
      <Link href={url}>{icon}</Link>
    </div>
  );
};

export default GoBack;
