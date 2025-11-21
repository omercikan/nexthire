import { CVDataFields } from "@/shared/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  selectedResumes: CVDataFields[];
  resumeOptionMenuID: string;
  renameResumeID: string;
}

const initialState: InitialState = {
  selectedResumes: [],
  resumeOptionMenuID: "",
  renameResumeID: "",
};

export const resumeSlice = createSlice({
  name: "resumeSlice",
  initialState,
  reducers: {
    setSelectedResumes: (
      state: InitialState,
      action: PayloadAction<CVDataFields>
    ) => {
      const id = action.payload._id;
      const exists = state.selectedResumes.some((resume) => resume._id === id);

      if (!exists) {
        state.selectedResumes.push(action.payload);
      } else {
        state.selectedResumes = state.selectedResumes.filter(
          (resume) => resume._id !== id
        );
      }
    },

    selectAllResumes: (state, action: PayloadAction<CVDataFields[]>) => {
      state.selectedResumes = action.payload;
    },

    clearSelectedResumes: () => {
      return initialState;
    },

    setResumeOptionMenuID: (state, action: PayloadAction<string>) => {
      state.resumeOptionMenuID = action.payload;
    },

    setRenameResumeID: (state, action: PayloadAction<string>) => {
      state.renameResumeID = action.payload;
    },
  },
});

export const {
  setSelectedResumes,
  clearSelectedResumes,
  selectAllResumes,
  setResumeOptionMenuID,
  setRenameResumeID,
} = resumeSlice.actions;
