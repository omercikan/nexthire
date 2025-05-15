import { configureStore } from "@reduxjs/toolkit";
import { userModalSlice } from "./features/users/userModalSlice";
import { userMenuSlice } from "./features/users/userMenuSlice";
import { featuredJobs } from "./services/featuredJobs";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
    [featuredJobs.reducerPath]: featuredJobs.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featuredJobs.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
