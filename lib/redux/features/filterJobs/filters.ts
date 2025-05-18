import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateFields = {
  jobType: "",
  experienceLevel: [],
  careerLevel: [],
};

interface initialStateFields {
  jobType: string;
  experienceLevel: string[];
  careerLevel: string[];
}

export const filtersJobs = createSlice({
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
  },
});

export const { selectJobType, selectExperienceLevel, selectCareerLevel } =
  filtersJobs.actions;
