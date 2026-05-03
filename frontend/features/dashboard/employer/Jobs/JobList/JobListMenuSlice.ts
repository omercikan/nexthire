import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  openMenuId: string;
  menuPostion: string;
  deleteModal: { open: boolean; jobId: string | null };
}

const initialState: InitialState = {
  openMenuId: "",
  menuPostion: "",
  deleteModal: { open: false, jobId: null },
};

export const jobListMenuSlice = createSlice({
  name: "jobListMenuSlice",
  initialState,
  reducers: {
    setMenuId: (state, action: PayloadAction<string>) => {
      const payload = action.payload;
      state.openMenuId = state.openMenuId === payload ? "" : payload;
    },

    setMenuPosition: (state, action: PayloadAction<"top" | "bottom">) => {
      state.menuPostion = action.payload;
    },

    setDeleteModal: (
      state,
      action: PayloadAction<{ open: boolean; jobId: string | null }>,
    ) => {
      state.deleteModal = action.payload;
    },
  },
});

export const { setMenuId, setMenuPosition, setDeleteModal } =
  jobListMenuSlice.actions;
