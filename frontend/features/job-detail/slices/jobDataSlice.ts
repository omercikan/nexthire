import { JobData } from "@/shared/types/jobDetail";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface jobDetailTypes {
  editedJobData: Omit<JobData, "employer"> | null;
}

const initialState: jobDetailTypes = {
  editedJobData: null,
};

export const jobDataSlice = createSlice({
  name: "jobDetailSlice",
  initialState,
  reducers: {
    setJobData: (state, action: PayloadAction<Omit<JobData, "employer">>) => {
      state.editedJobData = action.payload;
    },
  },
});

export const { setJobData } = jobDataSlice.actions;
export const jobDataReducer = jobDataSlice.reducer;
