import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface jobDetailTypes {
  jobDetail: {
    companyLogo: string;
    companyName: string;
    companyLocation: string;
    jobTitle: string;
    postId: string;
    companyId: string;
  };
}

const initialState: jobDetailTypes = {
  jobDetail: {
    companyLogo: "",
    companyName: "",
    companyLocation: "",
    jobTitle: "",
    postId: "",
    companyId: "",
  },
};

export const jobDetailSlice = createSlice({
  name: "jobDetailSlice",
  initialState,
  reducers: {
    setJobDetail: (state, action: PayloadAction<jobDetailTypes>) => {
      state.jobDetail = action.payload.jobDetail;
    },
  },
});

export const { setJobDetail } = jobDetailSlice.actions;
export const jobDetailReducer = jobDetailSlice.reducer;
