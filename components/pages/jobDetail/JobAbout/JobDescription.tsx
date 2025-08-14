import React from "react";

const JobDescription = ({ description }: { description: string }) => {
  return (
    <div className="mb-[50px]">
      <h2 className="text-[#202124] text-lg font-medium mb-5">İş Hakkında</h2>

      <p className="text-[#77838f] text-[15px]">{description}</p>
    </div>
  );
};

export default JobDescription;
