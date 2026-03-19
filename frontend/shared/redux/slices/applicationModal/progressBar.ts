import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressBarState {
  modalStep: number;
  progressBar: {
    barWidth: number;
    barWidthValue: number;
  };
  isEdit: boolean;
}

const initialState: ProgressBarState = {
  modalStep: 1,
  progressBar: {
    barWidth: 0,
    barWidthValue: 0,
  },
  isEdit: false,
};

export const ProgressBarSlice = createSlice({
  name: "progressBar",
  initialState,
  reducers: {
    setProgressBarValue: (
      state,
      action: PayloadAction<{
        barWidth: number;
        barWidthValue: number;
      }>,
    ) => {
      state.progressBar = action.payload;
    },

    setModalStep: (state, action: PayloadAction<number>) => {
      state.modalStep = action.payload;
    },

    resetProgressBarValue: () => {
      return initialState;
    },

    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
  },
});

export const {
  setProgressBarValue,
  setModalStep,
  resetProgressBarValue,
  setIsEdit,
} = ProgressBarSlice.actions;
