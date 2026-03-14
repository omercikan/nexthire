import { ActionCreatorWithPayload, UnknownAction } from "@reduxjs/toolkit";

export type JobTypes = string[];

export type FilterSwitch = {
  itemText: string;
};

export interface FilterData {
  totalCount: { count: 0 }[];
  data: {
    _id: string;
    jobTitle: string;
    location: string;
    careerLevel: string;
    category: string;
    workType: string;
    createdAt: string;
    employer: {
      _id: string;
      profilePhoto: string;
      companyName: string;
    };
  }[];
}

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

export type FilterStringFields = "jobType" | "pageValue";

export type FilterArrayFields = (
  | "careerLevel"
  | "experienceLevel"
  | "filtersItem"
  | "jobKeywords"
  | "locationKeywords"
)[];

export type FilterPaginationFields =
  | "nextPageValue"
  | "prevPageValue"
  | "activePage";
