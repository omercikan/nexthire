import React from "react";
import StatusItem from "./StatusItem";
import { ApplicationStep } from "./types";

const StatusList = ({ statusList }: { statusList: ApplicationStep[] }) => {
  return (
    <ul>
      {statusList?.toReversed().map(({ text, time }, index) => (
        <StatusItem key={index} text={text} time={time} />
      ))}
    </ul>
  );
};

export default StatusList;
