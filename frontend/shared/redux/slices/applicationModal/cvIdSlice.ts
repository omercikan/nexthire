import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cvIdSlice = createSlice({
  name: "cvIdSlice",
  initialState: { cvID: "" },
  reducers: {
    setCvID: (state, action: PayloadAction<string>) => {
      state.cvID = action.payload;
    },
  },
});

export const { setCvID } = cvIdSlice.actions;
