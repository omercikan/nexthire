import React from "react";

const JobRequirements = ({ requirements }: { requirements: string[] }) => {
  return (
    <div className="mb-[50px]">
      <h2 className="text-[#202124] text-lg font-medium mb-5">
        Aranan Nitelikler
      </h2>

      <ul className="list-disc ms-[15px]">
        {requirements.map((val) => (
          <li key={val} className="text-[#696969] text-[15px] mb-3">
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRequirements;
