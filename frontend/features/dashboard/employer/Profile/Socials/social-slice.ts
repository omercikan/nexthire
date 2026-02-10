import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  selectedPlatform: { id: number; platform: string; url: string }[];
  activeSocialPlatformId: number;
}

export const initialState: initialState = {
  selectedPlatform: [],
  activeSocialPlatformId: 0,
};

export const socialSlice = createSlice({
  name: "socialSlice",
  initialState,
  reducers: {
    setPlatform: (
      state,
      action: PayloadAction<{ id: number; url: string; platform: string }>,
    ) => {
      const payload = action.payload;
      const index = state.selectedPlatform.findIndex(
        (item) => item.id === payload.id,
      );

      if (index !== -1) {
        state.selectedPlatform[index].platform = payload.platform;
      } else {
        state.selectedPlatform.push(payload);
      }
    },

    removePlatform: (state, action: PayloadAction<number>) => {
      const removeId = action.payload;

      state.selectedPlatform = state.selectedPlatform
        .filter(({ id }) => id !== removeId)
        .map((item) => ({
          ...item,
          id: item.id > removeId ? item.id - 1 : item.id,
        }));
    },

    updatePlatformUrl: (
      state,
      action: PayloadAction<{ updateId: number; url: string }>,
    ) => {
      const { updateId, url } = action.payload;

      state.selectedPlatform = state.selectedPlatform.map((item) =>
        item.id === updateId ? { ...item, url } : item,
      );
    },

    setActiveSocialPlatformId: (state, action: PayloadAction<number>) => {
      const platformId = action.payload;

      if (state.activeSocialPlatformId !== platformId) {
        state.activeSocialPlatformId = platformId;
      } else {
        state.activeSocialPlatformId = 0;
      }
    },
  },
});

export const {
  setPlatform,
  removePlatform,
  updatePlatformUrl,
  setActiveSocialPlatformId,
} = socialSlice.actions;
