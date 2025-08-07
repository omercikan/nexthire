import React from "react";
import styles from "../scss/application-step.module.scss";
import { formatApplyTime } from "@/lib/utils/formatApplyTime";
import { ApplicationStep } from "./types";

const StatusItem = ({ text, time }: ApplicationStep) => {
  return (
    <li className={`${styles.applicationStep}`}>
      <span>{text}</span>
      <time>{formatApplyTime(time)}</time>
    </li>
  );
};

export default StatusItem;
