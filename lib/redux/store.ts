import { configureStore } from "@reduxjs/toolkit";
import { userModalSlice } from "./features/users/userModalSlice";
import { userMenuSlice } from "./features/users/userMenuSlice";
import { featuredJobsApi } from "./services/featuredJobsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bestCompaniesApi } from "./services/bestCompaniesApi";
import { filtersJobs } from "./features/filterJobs/filters";
import { jobPostings } from "./services/jobPostings";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
    filtersJob: filtersJobs.reducer,
    [featuredJobsApi.reducerPath]: featuredJobsApi.reducer,
    [bestCompaniesApi.reducerPath]: bestCompaniesApi.reducer,
    [jobPostings.reducerPath]: jobPostings.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      featuredJobsApi.middleware,
      bestCompaniesApi.middleware,
      jobPostings.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
