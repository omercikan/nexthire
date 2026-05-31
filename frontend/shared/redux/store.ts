import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { resumeApi } from "./services/resumeApi";
import { userModalSlice } from "./slices/user-modal/userModalSlice";
import { userMenuSlice } from "./slices/user-modal/userMenuSlice";
import { jobFilters } from "./slices/filtersValues";
import { touch } from "./slices/touch";
import { loading } from "../hooks/job-filter/loadingSlice";
import { applicationModalDataSlice } from "./slices/applicationModal/modalData";
import { cvIdSlice } from "./slices/applicationModal/cvIdSlice";
import { jobDataReducer } from "@/features/job-detail/slices/jobDataSlice";
import { applyModalScreenReducer } from "./slices/applicationModal/screenSize";
import { userDashboardSlice } from "@/features/dashboard/slices/userDashboardSlice";
import { featuredJobsApi } from "./services/featuredJobsApi";
import { bestCompaniesApi } from "@/features/home/components/BestCompany/bestCompaniesApi";
import { favoritesApi } from "../../features/jobs/postings/components/Favorite/favoritesApi";
import { jobApplicationApi } from "@/features/job-detail/components/applicationModal/modalControls/services/jobApplicationApi";
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
import { socialSlice } from "@/features/dashboard/employer/Profile/Socials/social-slice";
import { EmployerProfileAPI } from "@/features/dashboard/employer/Profile/api";
import { categorySlice } from "@/features/dashboard/employer/Profile/Category/category-slice";
import { chatAction } from "@/features/chat/slice/chat-action.slices";
import { chatData } from "@/features/chat/slice/chatData-slice";
import optionMenuReducer from "@/features/chat/components/OptionsMenu/slice/optionMenuSlice";
import candidateQuestionReducer from "@/features/dashboard/employer/ShareJob/CandidateQuestion/slice/candidateQuestionSlice";
import { modalControlSlice } from "@/features/job-detail/components/applicationModal/slices/modalControlSlice";
import { overviewApi } from "@/features/dashboard/employer/Overview/service/overview-api";
import { jobFiltersSlice } from "@/features/dashboard/employer/Jobs/JobFilters/jobListFiltersSlice";
import { jobListMenuSlice } from "@/features/dashboard/employer/Jobs/JobList/JobListMenuSlice";
import { employerJobsApi } from "@/features/dashboard/employer/Jobs/services/employerJobsApi";
import { applicantsApi } from "@/features/dashboard/employer/Jobs/services/applicantsApi";
import interviewSchedulerReducer from "@/features/dashboard/employer/Jobs/JobApplicationsDrawer/InterviewScheduler/interviewSchedulerSlice";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
    jobFilters: jobFilters.reducer,
    touch: touch.reducer,
    loading: loading.reducer,
    applicationModalData: applicationModalDataSlice.reducer,
    cvIdSlice: cvIdSlice.reducer,
    jobDataSlice: jobDataReducer,
    applyModalScreen: applyModalScreenReducer,
    userDashboard: userDashboardSlice.reducer,
    resumeSlice: resumeSlice.reducer,
    paginationSlice: paginationSlice.reducer,
    filtersSlice: filtersSlice.reducer,
    socialSlice: socialSlice.reducer,
    categorySlice: categorySlice.reducer,
    chatSlice: chatAction.reducer,
    chatData: chatData.reducer,
    optionMenuSlice: optionMenuReducer,
    candidateQuestionSlice: candidateQuestionReducer,
    modalControlSlice: modalControlSlice.reducer,
    jobListFilters: jobFiltersSlice.reducer,
    jobListMenu: jobListMenuSlice.reducer,
    interviewScheduler: interviewSchedulerReducer,
    [featuredJobsApi.reducerPath]: featuredJobsApi.reducer,
    [bestCompaniesApi.reducerPath]: bestCompaniesApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
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
    [EmployerProfileAPI.reducerPath]: EmployerProfileAPI.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [employerJobsApi.reducerPath]: employerJobsApi.reducer,
    [applicantsApi.reducerPath]: applicantsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      featuredJobsApi.middleware,
      bestCompaniesApi.middleware,
      favoritesApi.middleware,
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
      EmployerProfileAPI.middleware,
      overviewApi.middleware,
      employerJobsApi.middleware,
      applicantsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
