import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState: {
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;
