import { createSlice } from "@reduxjs/toolkit";

export const userMenuSlice = createSlice({
  name: "userMenuSlice",
  initialState: {
    menu: false,
  },
  reducers: {
    changeMenuState: (state: { menu: boolean }) => {
      state.menu = !state.menu;
    },
  },
});

export const { changeMenuState } = userMenuSlice.actions;
