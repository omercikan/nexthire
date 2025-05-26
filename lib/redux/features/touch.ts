import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const touch = createSlice({
  name: "touch",
  initialState: { touch: false },
  reducers: {
    setTouch: (state: {touch: boolean}, action: PayloadAction<boolean>) => {
      state.touch = action.payload;
    },
  },
});

export const { setTouch } = touch.actions;
