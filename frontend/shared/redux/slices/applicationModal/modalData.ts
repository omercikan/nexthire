import { CVDataFields } from "@/shared/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalDataState {
  email: string;
  phone: string;
  resume: string;
  additionalQuestions: { title: string; answer: string; index: number }[];
}

interface ApplicationStatus {
  postId: string;
  userId: string;
  companyName: string;
  status: "applied" | "notApplied" | "";
}

interface initialStateFields {
  applicationData: modalDataState;
  placeholderUploadData: {
    fileName: string;
    size: number;
    uploadTime: string;
  };
  uploadedFileNames: string[];
  resumeErrorMessage: string;
  selectedResume: string;
  selectedResumeFileName: string;
  selectedResumeUploadTime: Date | null;
  applicationStatus: ApplicationStatus;
}

const initialState: initialStateFields = {
  applicationData: {
    email: "",
    phone: "",
    resume: "",
    additionalQuestions: [],
  },

  placeholderUploadData: {
    fileName: "",
    size: 0,
    uploadTime: "",
  },

  uploadedFileNames: [],
  resumeErrorMessage: "",
  selectedResume: "",
  selectedResumeFileName: "",
  selectedResumeUploadTime: null,

  applicationStatus: {
    companyName: "",
    postId: "",
    userId: "",
    status: "",
  },
};

export const applicationModalDataSlice = createSlice({
  name: "applicationModalData",
  initialState,
  reducers: {
    setApplicationData: (
      state,
      action: PayloadAction<Partial<modalDataState>>,
    ) => {
      Object.assign(state.applicationData, action.payload);
    },

    setPlaceholderUploadData: (
      state,
      action: PayloadAction<
        Pick<CVDataFields, "fileName" | "uploadTime"> & { size: number }
      >,
    ) => {
      state.placeholderUploadData = action.payload;
    },

    clearPlaceholderUploadData: (state) => {
      state.placeholderUploadData = initialState.placeholderUploadData;
    },

    setUploadedFileNames: (state, action: PayloadAction<string[]>) => {
      state.uploadedFileNames = action.payload;
    },

    setResumeErrorMessage: (state, action: PayloadAction<string>) => {
      state.resumeErrorMessage = action.payload;
    },

    setSelectResume: (
      state,
      action: PayloadAction<{
        selectedResume: string;
        message: string;
        fileName: string;
        uploadTime: Date | null;
      }>,
    ) => {
      Object.assign(state, action.payload);
    },

    setApplicationStatus: (state, action: PayloadAction<ApplicationStatus>) => {
      state.applicationStatus = action.payload;
      state.applicationData = initialState.applicationData;
      state.selectedResume = "";
      state.selectedResumeFileName = "";
    },

    resetApplicationData: () => initialState,
  },
});

export const {
  setApplicationData,
  setPlaceholderUploadData,
  setUploadedFileNames,
  clearPlaceholderUploadData,
  setResumeErrorMessage,
  setSelectResume,
  setApplicationStatus,
  resetApplicationData,
} = applicationModalDataSlice.actions;
