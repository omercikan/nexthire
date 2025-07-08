import { configureStore } from "@reduxjs/toolkit";
import { userModalSlice } from "./features/users/userModalSlice";
import { userMenuSlice } from "./features/users/userMenuSlice";
import { featuredJobsApi } from "./services/featuredJobsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bestCompaniesApi } from "./services/bestCompaniesApi";
import { jobFilters } from "./features/filterJobs/filters";
import { jobPostings } from "./services/jobPostings";
import { touch } from "./features/touch";
import { loading } from "./features/loading";
import { favoritesApi } from "./services/favoritesApi";
import { jobDetailApi } from "./services/jobDetail";
import { ProgressBarSlice } from "./features/applicationModal/progressBar";
import { applicationModalDataSlice } from "./features/applicationModal/modalData";
import { uploadResume } from "./services/uploadResume";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
    jobFilters: jobFilters.reducer,
    touch: touch.reducer,
    loading: loading.reducer,
    applicationModalProgressBar: ProgressBarSlice.reducer,
    applicationModalData: applicationModalDataSlice.reducer,
    [featuredJobsApi.reducerPath]: featuredJobsApi.reducer,
    [bestCompaniesApi.reducerPath]: bestCompaniesApi.reducer,
    [jobPostings.reducerPath]: jobPostings.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [jobDetailApi.reducerPath]: jobDetailApi.reducer,
    [uploadResume.reducerPath]: uploadResume.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      featuredJobsApi.middleware,
      bestCompaniesApi.middleware,
      jobPostings.middleware,
      favoritesApi.middleware,
      jobDetailApi.middleware,
      uploadResume.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
