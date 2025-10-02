import { createSlice } from "@reduxjs/toolkit";

export const userModalSlice = createSlice({
  name: "userModalSlice",
  initialState: {
    modal: false,
  },
  reducers: {
    changeModalState: (state: { modal: boolean }) => {
      state.modal = !state.modal;
    },
  },
});

export const { changeModalState } = userModalSlice.actions;
