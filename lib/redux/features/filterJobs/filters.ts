import { EmployerOpenJobs } from "@/types";
import {
  FilterArrayFields,
  FilterPaginationFields,
  FilterStringFields,
  JobCompanyInformations,
  JobSearchFilters,
} from "@/types/filtersJob";
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
  },
  nextPageValue: 10,
  prevPageValue: 0,
  activePage: 1,
  openfilterMenu: false,
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
  };
  nextPageValue: number;
  prevPageValue: number;
  activePage: number;
  openfilterMenu: boolean;
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

    clearAllFilters: (state) => {
      const arrayFields: FilterArrayFields = [
        "careerLevel",
        "experienceLevel",
        "filtersItem",
        "jobKeywords",
        "locationKeywords",
      ];
      const stringFields: FilterStringFields[] = [
        "jobType",
        "pageValue",
        "sortValue",
      ];
      const otherFields: ["openfilterMenu", "filterData"] = [
        "openfilterMenu",
        "filterData",
      ];

      arrayFields.forEach((field) => {
        state[field] = [];
      });

      stringFields.forEach((field) => {
        state[field] = "";
      });

      otherFields.forEach((field) => {
        return initialState[field];
      });
    },

    clearMatchFilter: (
      state: initialStateFields,
      action: PayloadAction<string>
    ) => {
      const payload: string = action.payload;

      const arrayFields: FilterArrayFields = [
        "careerLevel",
        "experienceLevel",
        "filtersItem",
        "jobKeywords",
        "locationKeywords",
      ];

      const stringFields: FilterStringFields[] = [
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
      }>
    ) => {
      state.filterData = action.payload;
    },

    setPagination: (
      state: initialStateFields,
      action: PayloadAction<{
        nextPageValue: number;
        prevPageValue: number;
        activePage: number;
      }>
    ) => {
      const paginationFields: FilterPaginationFields[] = [
        "nextPageValue",
        "prevPageValue",
        "activePage",
      ];

      paginationFields.forEach((field) => {
        const value = action.payload[field];

        if (typeof value === "number") {
          state[field] = value;
        }
      });
    },

    openFilterMenu: (
      state: initialStateFields,
      action: PayloadAction<boolean>
    ) => {
      state.openfilterMenu = action.payload;
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
  setPagination,
  openFilterMenu,
} = jobFilters.actions;
