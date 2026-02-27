import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpenChat: false,
  isMinimize: false,
  isOpenOptionsMenu: false,
  isOpenEmojiMenu: false,
};

export const chatAction = createSlice({
  name: "chatActionSlice",
  initialState,
  reducers: {
    changeChatStatus: (state, action: PayloadAction<"close" | "minimize">) => {
      const payload = action.payload === "close" ? "isOpenChat" : "isMinimize";

      state[payload] = !state[payload];
      state[action.payload === "close" ? "isMinimize" : "isOpenChat"] = false;
    },

    changeOptionsMenuStatus: (state) => {
      state.isOpenOptionsMenu = !state.isOpenOptionsMenu;
    },

    changeEmojiMenuStatus: (state) => {
      state.isOpenEmojiMenu = !state.isOpenEmojiMenu;
    },
  },
});

export const {
  changeChatStatus,
  changeOptionsMenuStatus,
  changeEmojiMenuStatus,
} = chatAction.actions;
