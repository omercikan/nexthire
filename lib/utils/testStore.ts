import { configureStore } from "@reduxjs/toolkit";
import { applicationModalDataSlice } from "../redux/features/applicationModal/modalData";
import { ProgressBarSlice } from "../redux/features/applicationModal/progressBar";
import { jobDetailReducer } from "../redux/features/jobDetail";

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
