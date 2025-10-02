import React from "react";
import styles from "../scss/application-step.module.scss";
import { ApplicationStep } from "./types";
import { formatApplyTime } from "@/shared/utils/formatApplyTime";

const StatusItem = ({ text, time }: ApplicationStep) => {
  return (
    <li className={`${styles.applicationStep}`}>
      <span>{text}</span>
      <time>{formatApplyTime(time)}</time>
    </li>
  );
};

export default StatusItem;
