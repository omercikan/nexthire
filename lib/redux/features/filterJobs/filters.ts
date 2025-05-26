import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateFields = {
  jobType: "",
  experienceLevel: [],
  careerLevel: [],
  sortValue: "",
  pageValue: "",
  filtersItem: [],
};

interface initialStateFields {
  jobType: string;
  experienceLevel: string[];
  careerLevel: string[];
  sortValue: string;
  pageValue: string;
  filtersItem: string[];
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

      const arrayFields: ["careerLevel", "experienceLevel", "filtersItem"] = [
        "careerLevel",
        "experienceLevel",
        "filtersItem",
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
} = jobFilters.actions;
