import { JobData } from "@/shared/types/jobDetail";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface jobDetailTypes {
  editedJobData: JobData | null;
}

const initialState: jobDetailTypes = {
  editedJobData: null,
};

export const jobDataSlice = createSlice({
  name: "jobDetailSlice",
  initialState,
  reducers: {
    setJobData: (state, action: PayloadAction<JobData>) => {
      state.editedJobData = action.payload;
    },
  },
});

export const { setJobData } = jobDataSlice.actions;
export const jobDataReducer = jobDataSlice.reducer;
