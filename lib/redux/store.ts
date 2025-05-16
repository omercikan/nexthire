import { configureStore } from "@reduxjs/toolkit";
import { userModalSlice } from "./features/users/userModalSlice";
import { userMenuSlice } from "./features/users/userMenuSlice";
import { featuredJobsApi } from "./services/featuredJobsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bestCompaniesApi } from "./services/bestCompaniesApi";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
    [featuredJobsApi.reducerPath]: featuredJobsApi.reducer,
    [bestCompaniesApi.reducerPath]: bestCompaniesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      featuredJobsApi.middleware,
      bestCompaniesApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
