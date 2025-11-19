import { SuccessProps } from "@/shared/types";
import React from "react";

const Success = ({ icon, title, subtitle, message }: SuccessProps) => {
  return (
    <div>
      {icon}

      <h1 className="text-[#2E3139] text-[32px] font-semibold mt-3 max-[460px]:text-[20px]">
        {title}
      </h1>
      <p className="text-[#425583] mt-1.5 text-sm">
        {subtitle}
        <br />
        {message}
      </p>
    </div>
  );
};

export default Success;
