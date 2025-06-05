import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const touch = createSlice({
  name: "touch",
  initialState: { touch: false, touchSortList: false },
  reducers: {
    setTouch: (state: { touch: boolean }, action: PayloadAction<boolean>) => {
      state.touch = action.payload;
    },

    setTouchSortList: (
      state: { touchSortList: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.touchSortList = action.payload;
    },
  },
});

export const { setTouch, setTouchSortList } = touch.actions;
