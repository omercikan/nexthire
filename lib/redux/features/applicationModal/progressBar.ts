import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressBarState {
  modalStep: number;
  isAdditionalQuestions: boolean;
  progressBar: {
    barWidth: number;
    barWidthValue: number;
  };
  isEdit: boolean;
}

const initialState: ProgressBarState = {
  modalStep: 1,
  isAdditionalQuestions: false,
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
      }>
    ) => {
      state.progressBar = action.payload;
    },

    setModalStep: (state, action: PayloadAction<number>) => {
      state.modalStep = action.payload;
    },

    setIsAdditionalQuestions: (state, action: PayloadAction<boolean>) => {
      state.isAdditionalQuestions = action.payload;
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
  setIsAdditionalQuestions,
  resetProgressBarValue,
  setIsEdit,
} = ProgressBarSlice.actions;
