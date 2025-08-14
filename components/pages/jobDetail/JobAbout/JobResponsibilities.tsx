import React from "react";

const JobResponsibilities = ({
  responsibilities,
}: {
  responsibilities: string[];
}) => {
  return (
    <div className="mb-[50px]">
      <h2 className="text-[#202124] text-lg font-medium mb-5">
        Temel Sorumluluklar
      </h2>

      <ul className="list-disc ms-[15px]">
        {responsibilities.map((val) => (
          <li key={val} className="text-[#696969] text-[15px] mb-3">
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobResponsibilities;
