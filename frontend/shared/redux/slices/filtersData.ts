import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  perPage: string;
  sort: string;
  jobTitle: string;
  location: string;
  workType: string;
  experience: string[];
  careerLevel: string[];
}

const initialState: InitialState = {
  perPage: "",
  sort: "",
  jobTitle: "",
  location: "",
  workType: "",
  experience: [],
  careerLevel: [],
};

export const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<typeof initialState>>
    ) => {
      Object.assign(state, action.payload);
    },

    clearFilters: () => initialState,
  },
});
export const { setFilters, clearFilters } = filtersSlice.actions;
