import { createSlice } from "@reduxjs/toolkit";

export const screenSizeSlice = createSlice({
  name: "screenSizeSlice",
  initialState: {
    isSmallScreen: false,
  },
  reducers: {
    setScreenState: (state, action) => {
      state.isSmallScreen = action.payload;
    },
  },
});

export const { setScreenState } = screenSizeSlice.actions;
export const applyModalScreenReducer = screenSizeSlice.reducer;
