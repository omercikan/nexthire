import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const jobListMenuSlice = createSlice({
  name: "jobListMenuSlice",
  initialState: { openMenuId: "", menuPostion: "" },
  reducers: {
    setMenuId: (state, action: PayloadAction<string>) => {
      const payload = action.payload;
      state.openMenuId = state.openMenuId === payload ? "" : payload;
    },

    setMenuPosition: (state, action: PayloadAction<"top" | "bottom">) => {
      state.menuPostion = action.payload;
    },
  },
});

export const { setMenuId, setMenuPosition } = jobListMenuSlice.actions;
