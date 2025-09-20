import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  activeText: "",
  collapseMenu: false,
  smallScreenMenu: false,
  breakpoint: 0,
  profileImage: "",
};

export const userDashboardSlice = createSlice({
  name: "userDashboardSlice",
  initialState,
  reducers: {
    setActiveText: (state, action) => {
      state.activeText = action.payload;
    },

    setCollapseMenu: (state) => {
      state.collapseMenu = !state.collapseMenu;
    },

    setSmallScreenMenu: (state) => {
      state.smallScreenMenu = !state.smallScreenMenu;
    },

    setSmallBreakpoint: (state, action: PayloadAction<number>) => {
      state.breakpoint = action.payload;
    },

    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  setActiveText,
  setCollapseMenu,
  setSmallScreenMenu,
  setSmallBreakpoint,
  setProfileImage,
} = userDashboardSlice.actions;
