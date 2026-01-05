import {
  FilterArrayFields,
  FilterData,
  FilterStringFields,
  JobSearchFilters,
} from "@/shared/types/filtersJob";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateFields = {
  jobType: "",
  experienceLevel: [],
  careerLevel: [],
  pageValue: "",
  filtersItem: [],
  jobKeywords: [],
  locationKeywords: [],
  isFetching: false,
  filterData: {
    totalCount: [{ count: 0 }],
    data: [],
  },
  openfilterMenu: false,
};

interface initialStateFields {
  jobType: string;
  experienceLevel: string[];
  careerLevel: string[];
  pageValue: string;
  filtersItem: string[];
  jobKeywords: string[];
  locationKeywords: string[];
  filterData: FilterData;
  isFetching: boolean;
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

    selectJobKeyword: (
      state: initialStateFields,
      action: PayloadAction<string[]>
    ) => {
      state.jobKeywords = action.payload;
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
      const stringFields: FilterStringFields[] = ["jobType", "pageValue"];
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
      action: PayloadAction<{ filterData?: FilterData; isFetching: boolean }>
    ) => {
      const { filterData, isFetching } = action.payload;

      if (filterData) {
        state.filterData = filterData;
      }

      state.isFetching = isFetching;
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
  selectFiltersItem,
  clearAllFilters,
  setFilterData,
  selectJobKeyword,
  setJobSearchFilterData,
  openFilterMenu,
} = jobFilters.actions;
