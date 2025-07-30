import { CVDataFields } from "@/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalDataState {
  email: string;
  phone: string;
  resume: string;
  additionalQuestions: { title: string; answer: string; index: number }[];
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
  selectedResumeUploadTime: string;
  additionalQuestionsFromJob: {
    isSelectAnswer: boolean;
    isTextAnswer: boolean;
    selectQuestions: { questionAnswers: string[]; questionTitle: string }[];
    textQuestions: { questionTitle: string }[];
  };
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
  selectedResumeUploadTime: "",

  additionalQuestionsFromJob: {
    isSelectAnswer: false,
    isTextAnswer: false,
    selectQuestions: [],
    textQuestions: [],
  },
};

export const applicationModalDataSlice = createSlice({
  name: "applicationModalData",
  initialState,
  reducers: {
    setApplicationData: (
      state,
      action: PayloadAction<Partial<modalDataState>>
    ) => {
      const fields: (keyof modalDataState)[] = [
        "email",
        "phone",
        "resume",
        "additionalQuestions",
      ];

      fields.forEach((field) => {
        const value = action.payload[field];

        if (value !== undefined) {
          (state.applicationData[field] as typeof value) = value;
        }
      });
    },

    setPlaceholderUploadData: (
      state,
      action: PayloadAction<
        Pick<CVDataFields, "fileName" | "uploadTime"> & { size: number }
      >
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
        resume: string;
        fileName: string;
        uploadTime: string;
      }>
    ) => {
      state.selectedResume = action.payload.selectedResume;
      state.resumeErrorMessage = action.payload.message;
      state.applicationData.resume = action.payload.resume;
      state.selectedResumeFileName = action.payload.fileName;
      state.selectedResumeUploadTime = action.payload.uploadTime;
    },

    setAdditionalQuestionsFromJob: (state, action) => {
      state.additionalQuestionsFromJob = action.payload;
    },
  },
});

export const {
  setApplicationData,
  setPlaceholderUploadData,
  setUploadedFileNames,
  clearPlaceholderUploadData,
  setResumeErrorMessage,
  setSelectResume,
  setAdditionalQuestionsFromJob,
} = applicationModalDataSlice.actions;
