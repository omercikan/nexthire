import { configureStore } from "@reduxjs/toolkit";
import { userModalSlice } from "./features/users/userModalSlice";
import { userMenuSlice } from "./features/users/userMenuSlice";

export const store = configureStore({
  reducer: {
    userModal: userModalSlice.reducer,
    userMenu: userMenuSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
