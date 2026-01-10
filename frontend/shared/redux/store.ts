import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { resumeApi } from "./services/resumeApi";
import { userModalSlice } from "./slices/user-modal/userModalSlice";
import { userMenuSlice } from "./slices/user-modal/userMenuSlice";
import { jobFilters } from "./slices/filtersValues";
import { touch } from "./slices/touch";
import { loading } from "../hooks/job-filter/loadingSlice";
import { ProgressBarSlice } from "./slices/applicationModal/progressBar";
import { applicationModalDataSlice } from "./slices/applicationModal/modalData";
import { cvIdSlice } from "./slices/applicationModal/cvIdSlice";
import { jobDetailReducer } from "@/features/job-detail/slices/jobDetailSlice";
import { applyModalScreenReducer } from "./slices/applicationModal/screenSize";
import { userDashboardSlice } from "@/features/dashboard/slices/userDashboardSlice";
import { featuredJobsApi } from "./services/featuredJobsApi";
import { bestCompaniesApi } from "@/features/home/components/BestCompany/bestCompaniesApi";
import { favoritesApi } from "../../features/jobs/postings/components/Favorite/favoritesApi";
import { jobDetailApi } from "./services/jobDetail";
import { jobApplicationApi } from "@/features/job-detail/components/applicationModal/modalControls/jobApplicationApi";
import { GeocodeApi } from "@/features/job-detail/components/JobAbout/JobMap/geocodeApi";
import { candidateStaticsApi } from "@/features/dashboard/services/candidateStaticsApi";
import { userViewsApi } from "@/features/dashboard/services/userViewsApi";
import { candidateProfileApi } from "@/features/dashboard/services/candidateProfileApi";
import { authServiceApi } from "@/features/auth/services/auth-service";
import { candidateResumeApi } from "@/features/dashboard/services/candidateResumeApi";
import { resumeSlice } from "@/features/dashboard/candidate/Resumes/resumeSlice";
import { jobApi } from "@/features/dashboard/employer/services/jobApi";
import { jobsApi } from "@/features/jobs/postings/services/jobsApi";
import { paginationSlice } from "@/features/jobs/postings/components/pagination/paginationSlice";
import { filtersSlice } from "./slices/filtersData";

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
    resumeSlice: resumeSlice.reducer,
    paginationSlice: paginationSlice.reducer,
    filtersSlice: filtersSlice.reducer,
    [featuredJobsApi.reducerPath]: featuredJobsApi.reducer,
    [bestCompaniesApi.reducerPath]: bestCompaniesApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [jobDetailApi.reducerPath]: jobDetailApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
    [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
    [GeocodeApi.reducerPath]: GeocodeApi.reducer,
    [candidateStaticsApi.reducerPath]: candidateStaticsApi.reducer,
    [userViewsApi.reducerPath]: userViewsApi.reducer,
    [candidateProfileApi.reducerPath]: candidateProfileApi.reducer,
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    [candidateResumeApi.reducerPath]: candidateResumeApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      featuredJobsApi.middleware,
      bestCompaniesApi.middleware,
      favoritesApi.middleware,
      jobDetailApi.middleware,
      resumeApi.middleware,
      jobApplicationApi.middleware,
      GeocodeApi.middleware,
      candidateStaticsApi.middleware,
      userViewsApi.middleware,
      candidateProfileApi.middleware,
      authServiceApi.middleware,
      candidateResumeApi.middleware,
      jobApi.middleware,
      jobsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
