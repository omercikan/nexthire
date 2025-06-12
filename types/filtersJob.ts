import { ActionCreatorWithPayload, UnknownAction } from "@reduxjs/toolkit";

export type JobTypes = string[];

export type FilterSwitch = {
  itemText: string;
};

export interface JobCompanyInformations {
  companyInformations: {
    companyLogo: string;
    companyName: string;
    featured: boolean;
    serviceArea: string;
    companyId: string;
    numberOfEmployees: string;
    location: string;
  };
}

export interface CustomListProps {
  title?: string;
  options: string[];
  state: string;
  setState: (e: string) => UnknownAction;
  defaultValue: string;
  screenClass?: string;
  listClass?: string;
  listWrapperClass?: string;
  openCustomList: string;
  setOpenCustomList: ActionCreatorWithPayload<
    string,
    "touch/setOpenCustomList"
  >;
}

export interface JobSearchFilters {
  jobKeywords: string[];
  locationKeywords: string[];
  filterItems: string[];
}

export type FilterStringFields = "jobType" | "pageValue" | "sortValue";

export type FilterArrayFields = (
  | "careerLevel"
  | "experienceLevel"
  | "filtersItem"
  | "jobKeywords"
  | "locationKeywords"
)[];
