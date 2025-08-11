import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  touch: false,
  touchSortList: false,
  openCustomList: "",
  openApplicationModal: false,
  showMoreResumes: false,
  isExitModal: false,
};

interface initialState {
  touch: boolean;
  touchSortList: boolean;
  openCustomList: string;
  openApplicationModal: boolean;
  showMoreResumes: boolean;
  isExitModal: boolean;
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

    setApplicationModal: (
      state: Pick<initialState, "openApplicationModal">,
      action: PayloadAction<boolean>
    ) => {
      state.openApplicationModal = action.payload;
    },

    changeShowMoreResumes: (state) => {
      state.showMoreResumes = !state.showMoreResumes;
    },

    setExitModalState: (state, action: PayloadAction<boolean>) => {
      state.isExitModal = action.payload;
    },
  },
});

export const {
  setTouch,
  setTouchSortList,
  setOpenCustomList,
  setApplicationModal,
  changeShowMoreResumes,
  setExitModalState,
} = touch.actions;
