import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  changeChatStatus,
  changeEmojiMenuStatus,
  changeOptionsMenuStatus,
} from "../slice/chat-action.slices";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

const useChatActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatSlice, optionMenuSlice } = useSelector(
    (state: RootState) => state,
  );
  const isMediumBreakpoint = useMediaQuery("(max-width:768px)");
  const status = { ...chatSlice, ...optionMenuSlice };

  useEffect(() => {
    if (status.isOpenChat && isMediumBreakpoint) {
      document.body.style.overflow = "hidden";
    }

    if (!isMediumBreakpoint && !status.isFullScreen) {
      document.body.style.overflow = "visible";
    }
  }, [isMediumBreakpoint, status.isOpenChat, status.isFullScreen]);

  const handleChatStatus = (payload: "close" | "minimize") => {
    dispatch(changeChatStatus(payload));
    if (status.isFullScreen) document.body.style.overflow = "hidden";
  };

  const handleOptionsMenuStatus = () => dispatch(changeOptionsMenuStatus());

  const handleEmojiMenuStatus = () => dispatch(changeEmojiMenuStatus());

  return {
    handleChatStatus,
    handleOptionsMenuStatus,
    handleEmojiMenuStatus,
    isMediumBreakpoint,
    status,
  };
};

export default useChatActions;
