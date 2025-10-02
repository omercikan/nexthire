import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loading = createSlice({
  name: "loading",
  initialState: { loading: false },
  reducers: {
    setLoading: (
      state: { loading: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loading.actions;
