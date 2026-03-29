import styles from "../scss/application-step.module.scss";
import { formatApplyTime } from "@/shared/utils/formatApplyTime";
import { StatusList } from "./types";

const VALUE_MAP = {
  pending: "Başvuru Yapıldı",
  reviewed: "Başvuru İncelendi",
  accepted: "Başvuru Kabul Edildi",
  rejected: "Başvuru Reddedildi",
};

const StatusItem = ({ value, changedAt }: StatusList) => {
  return (
    <li className={`${styles.applicationStep}`}>
      <span>{VALUE_MAP[value]}</span>
      <time>{formatApplyTime(changedAt)}</time>
    </li>
  );
};

export default StatusItem;
