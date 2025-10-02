import { configureStore } from "@reduxjs/toolkit";
import { applicationModalDataSlice } from "../redux/slices/applicationModal/modalData";
import { ProgressBarSlice } from "../redux/slices/applicationModal/progressBar";
import { jobDetailReducer } from "@/features/job-detail/slices/jobDetailSlice";

export const testStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      applicationModalData: applicationModalDataSlice.reducer,
      applicationModalProgressBar: ProgressBarSlice.reducer,
      jobDetail: jobDetailReducer,
    },
    preloadedState,
  });
};
