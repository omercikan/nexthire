import React from "react";
import StatusList from "./StatusList";
import { ApplicationStep } from "./types";

const ApplicationTimeline = ({
  statusList,
}: {
  statusList: ApplicationStep[];
}) => {
  return (
    <div className="container">
      <div className="border-t border-t-[#C4CBD9] my-6"></div>

      <h2 className="text-xl font-medium text-[#000000E6]">Başvuru Süreci</h2>

      <StatusList statusList={statusList} />
    </div>
  );
};

export default ApplicationTimeline;
