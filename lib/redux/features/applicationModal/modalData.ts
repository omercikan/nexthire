import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalDataState {
  email: string;
  phone: string;
  resume: string;
  additionalQuestions: object[];
}

const initialState = {
  email: "",
  phone: "",
  resume: "",
  additionalQuestions: [],
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
          (state[field] as typeof value) = value;
        }
      });
    },
  },
});

export const { setApplicationData } = applicationModalDataSlice.actions;
