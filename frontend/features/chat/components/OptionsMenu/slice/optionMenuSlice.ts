import { changeOptionsMenuStatus } from "@/features/chat/slice/chat-action.slices";
import { AppDispatch } from "@/shared/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OptionMenuState {
  isFullScreen: boolean;
  isCvAnalyze: boolean;
}

const initialState: OptionMenuState = {
  isFullScreen: false,
  isCvAnalyze: false,
};

export const optionMenuSlice = createSlice({
  name: "optionMenuSlice",
  initialState,
  reducers: {
    updateOptionState: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "tam ekran yap":
          state.isFullScreen = true;
          document.body.style.overflow = "hidden";
          break;
        case "tam ekran'dan çık":
          state.isFullScreen = false;
          document.body.style.overflow = "visible";
          break;
        case "cv analiz modunu aç":
          state.isCvAnalyze = true;
          break;
        case "cv analiz modunu kapat":
          state.isCvAnalyze = false;
          break;
        default:
          return initialState;
      }
    },
  },
});

export const { updateOptionState } = optionMenuSlice.actions;

export const updateOption = (option: string) => (dispatch: AppDispatch) => {
  dispatch(updateOptionState(option));
  dispatch(changeOptionsMenuStatus());
};

export default optionMenuSlice.reducer;
