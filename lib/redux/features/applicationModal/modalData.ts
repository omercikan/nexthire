import { CVDataFields } from "@/types/resume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalDataState {
  email: string;
  phone: string;
  resume: string;
  additionalQuestions: object[];
}

interface initialStateFields {
  applicationData: modalDataState;
  placeholderUploadData: {
    fileName: string;
    size: number;
    uploadTime: string;
  };
  uploadedFileNames: string[];
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

    setUploadedFileNames: (state, action: PayloadAction<string[]>) => {
      state.uploadedFileNames = action.payload;
    },
  },
});

export const {
  setApplicationData,
  setPlaceholderUploadData,
  setUploadedFileNames,
} = applicationModalDataSlice.actions;
