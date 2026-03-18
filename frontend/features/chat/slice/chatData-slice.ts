import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  message: string;
  file: { name: string; size: number; type: string } | null;
  from: "ai" | "user";
}

export interface InitialState {
  isLoading: boolean;
  messages: Message[];
  error: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  messages: [],
  error: false,
};

export const chatData = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addMessage, setError, setLoading } = chatData.actions;
