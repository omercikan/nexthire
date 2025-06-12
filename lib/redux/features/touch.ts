import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  touch: false,
  touchSortList: false,
  openCustomList: "",
};

interface initialState {
  touch: boolean;
  touchSortList: boolean;
  openCustomList: string;
}

export const touch = createSlice({
  name: "touch",
  initialState,
  reducers: {
    setTouch: (state: initialState, action: PayloadAction<boolean>) => {
      state.touch = action.payload;
    },

    setTouchSortList: (state: initialState, action: PayloadAction<boolean>) => {
      state.touchSortList = action.payload;
    },

    setOpenCustomList: (state: initialState, action: PayloadAction<string>) => {
      state.openCustomList = action.payload;
    },
  },
});

export const { setTouch, setTouchSortList, setOpenCustomList } = touch.actions;
