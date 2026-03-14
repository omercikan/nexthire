import { Dayjs } from "dayjs";
import { IconType } from "react-icons/lib";

export type OverviewList = {
  id: number;
  icon: IconType;
  text: string;
  value: string;
};

export interface OverviewData {
  postedDate: string;
  location: string;
  salary?: string;
  applicationDeadline: Dayjs;
  experience: string;
  gender?: string;
  educationLevel: string[];
  careerLevel: string;
}
