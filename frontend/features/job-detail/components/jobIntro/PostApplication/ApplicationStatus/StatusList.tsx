import React from "react";
import StatusItem from "./StatusItem";
import { StatusList as StatusListType } from "./types";

const StatusList = ({ statusList }: { statusList: StatusListType[] }) => {
  return (
    <ul>
      {statusList.map(({ _id, value, changedAt }) => (
        <StatusItem key={_id} value={value} changedAt={changedAt} />
      ))}
    </ul>
  );
};

export default StatusList;
