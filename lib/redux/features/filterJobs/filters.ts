import { EmployerOpenJobs } from "@/types";
import { JobCompanyInformations, JobSearchFilters } from "@/types/filtersJob";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateFields = {
  jobType: "",
  experienceLevel: [],
  careerLevel: [],
  sortValue: "",
  pageValue: "",
  filtersItem: [],
  jobKeywords: [],
  locationKeywords: [],
  filterData: {
    countJobs: 0,
    jobs: [],
    isFilter: false,
    isLoading: false,
  },
};

interface initialStateFields {
  jobType: string;
  experienceLevel: string[];
  careerLevel: string[];
  sortValue: string;
  pageValue: string;
  filtersItem: string[];
  jobKeywords: string[];
  locationKeywords: string[];
  filterData: {
    countJobs: number;
    jobs: (JobCompanyInformations & EmployerOpenJobs)[];
    isFilter: boolean;
    isLoading: boolean;
  };
}

export const jobFilters = createSlice({
  name: "filterJobs",
  initialState,
  reducers: {
    selectJobType: (state: initialStateFields, action: { payload: string }) => {
      state.jobType = action.payload;
    },

    selectExperienceLevel: (
      state: initialStateFields,
      action: { payload: string[] }
    ) => {
      state.experienceLevel = action.payload;
    },

    selectCareerLevel: (
      state: initialStateFields,
      action: { payload: string[] }
    ) => {
      state.careerLevel = action.payload;
    },

    selectSortValue: (
      state: initialStateFields,
      action: { payload: string }
    ) => {
      state.sortValue = action.payload;
    },

    selectPageValue: (
      state: initialStateFields,
      action: { payload: string }
    ) => {
      state.pageValue = action.payload;
    },

    selectJobKeyword: (
      state: initialStateFields,
      action: PayloadAction<string[]>
    ) => {
      state.jobKeywords = action.payload;
    },

    selectLocationKeyword: (
      state: initialStateFields,
      action: PayloadAction<string[]>
    ) => {
      state.locationKeywords = action.payload;
    },

    selectFiltersItem: (
      state: initialStateFields,
      action: { payload: string[] }
    ) => {
      state.filtersItem = action.payload;
    },

    clearAllFilters: () => {
      return initialState;
    },

    clearMatchFilter: (
      state: initialStateFields,
      action: PayloadAction<string>
    ) => {
      const payload: string = action.payload;

      const arrayFields: [
        "careerLevel",
        "experienceLevel",
        "filtersItem",
        "jobKeywords",
        "locationKeywords"
      ] = [
        "careerLevel",
        "experienceLevel",
        "filtersItem",
        "jobKeywords",
        "locationKeywords",
      ];

      const stringFields: ["jobType", "pageValue", "sortValue"] = [
        "jobType",
        "pageValue",
        "sortValue",
      ];

      arrayFields.forEach((field) => {
        if (Array.isArray(state[field]) && state[field].includes(payload)) {
          state[field] = state[field].filter((item) => item !== payload);
        }
      });

      stringFields.forEach((field) => {
        if (state[field] === payload) {
          state[field] = "";
        }
      });
    },

    setJobSearchFilterData: (
      state: initialStateFields,
      action: PayloadAction<JobSearchFilters>
    ) => {
      state.jobKeywords = action.payload.jobKeywords;
      state.locationKeywords = action.payload.locationKeywords;
      state.filtersItem = action.payload.filterItems;
    },

    setFilterData: (
      state: initialStateFields,
      action: PayloadAction<{
        countJobs: number;
        jobs: (JobCompanyInformations & EmployerOpenJobs)[];
        isFilter: boolean;
        isLoading: boolean;
      }>
    ) => {
      state.filterData = action.payload;
    },
  },
});

export const {
  selectJobType,
  selectExperienceLevel,
  selectCareerLevel,
  selectSortValue,
  selectPageValue,
  selectFiltersItem,
  clearAllFilters,
  clearMatchFilter,
  setFilterData,
  selectJobKeyword,
  selectLocationKeyword,
  setJobSearchFilterData,
} = jobFilters.actions;
