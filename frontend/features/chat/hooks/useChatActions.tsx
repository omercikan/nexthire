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
  const status = useSelector((state: RootState) => state.chatSlice);
  const isMediumBreakpoint = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (status.isOpenChat && isMediumBreakpoint) {
      document.body.style.overflow = "hidden";
    }

    if (!isMediumBreakpoint) document.body.style.overflow = "visible";
  }, [isMediumBreakpoint, status.isOpenChat]);

  const handleChatStatus = (payload: "close" | "minimize") => {
    dispatch(changeChatStatus(payload));
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
