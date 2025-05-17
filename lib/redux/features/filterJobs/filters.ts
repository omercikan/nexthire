import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobType: "",
};

export const filtersJobs = createSlice({
  name: "filterJobs",
  initialState,
  reducers: {
    selectJobType: (state, action: { payload: string }) => {
      state.jobType = action.payload;
    },
  },
});

export const { selectJobType } = filtersJobs.actions;
