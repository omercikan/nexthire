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
import { resumeApi } from "./services/resumeApi";
import { cvIdSlice } from "./features/applicationModal/cvIdSlice";
import { jobDetailReducer } from "./features/jobDetail";
import { jobApplicationApi } from "./services/jobApplicationApi";
import { applyModalScreenReducer } from "./features/applicationModal/screenSize";
import { GeocodeApi } from "./services/geocodeApi";
import { userDashboardSlice } from "./features/dashboard/userDashboardSlice";
import { candidateStaticsApi } from "./services/dashboard/candidateStaticsApi";
import { userViewsApi } from "./services/dashboard/userViewsApi";
import { candidateProfileApi } from "./services/dashboard/candidateProfileApi";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
    jobFilters: jobFilters.reducer,
    touch: touch.reducer,
    loading: loading.reducer,
    applicationModalProgressBar: ProgressBarSlice.reducer,
    applicationModalData: applicationModalDataSlice.reducer,
    cvIdSlice: cvIdSlice.reducer,
    jobDetail: jobDetailReducer,
    applyModalScreen: applyModalScreenReducer,
    userDashboard: userDashboardSlice.reducer,
    [featuredJobsApi.reducerPath]: featuredJobsApi.reducer,
    [bestCompaniesApi.reducerPath]: bestCompaniesApi.reducer,
    [jobPostings.reducerPath]: jobPostings.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [jobDetailApi.reducerPath]: jobDetailApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
    [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
    [GeocodeApi.reducerPath]: GeocodeApi.reducer,
    [candidateStaticsApi.reducerPath]: candidateStaticsApi.reducer,
    [userViewsApi.reducerPath]: userViewsApi.reducer,
    [candidateProfileApi.reducerPath]: candidateProfileApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      featuredJobsApi.middleware,
      bestCompaniesApi.middleware,
      jobPostings.middleware,
      favoritesApi.middleware,
      jobDetailApi.middleware,
      resumeApi.middleware,
      jobApplicationApi.middleware,
      GeocodeApi.middleware,
      candidateStaticsApi.middleware,
      userViewsApi.middleware,
      candidateProfileApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
