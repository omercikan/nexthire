import { Timestamp } from "firebase/firestore";
import { IconType } from "react-icons/lib";

export type OverviewList = {
  id: number;
  icon: IconType;
  text: string;
  value: string;
};

export interface OverviewData {
  postedDate: Timestamp;
  location: string;
  salary?: string;
  applicationDeadline: string;
  experience: string;
  gender?: string;
  educationLevel: string[];
  careerLevel: string;
}
