import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
};

export const modalControlSlice = createSlice({
  name: "modalControlSlice",
  initialState,
  reducers: {
    updateStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { updateStep } = modalControlSlice.actions;
export default modalControlSlice.reducer;
