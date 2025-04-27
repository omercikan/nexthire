import { Employer } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const employerSlice = createSlice({
  name: "employerSlice",
  initialState: <{ employers: Employer[] }>{
    employers: [],
  },
  reducers: {
    setEmployers: (
      state: { employers: Employer[] },
      action: PayloadAction<Employer[]>
    ) => {
      state.employers = action.payload;
    },
  },
});

export const { setEmployers } = employerSlice.actions;
