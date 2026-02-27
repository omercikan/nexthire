import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  changeChatStatus,
  changeEmojiMenuStatus,
  changeOptionsMenuStatus,
} from "../slice/chat-action.slices";

const useChatActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.chatSlice);

  const handleChatStatus = (payload: "close" | "minimize") => {
    dispatch(changeChatStatus(payload));
  };

  const handleOptionsMenuStatus = () => dispatch(changeOptionsMenuStatus());

  const handleEmojiMenuStatus = () => dispatch(changeEmojiMenuStatus());

  return {
    handleChatStatus,
    handleOptionsMenuStatus,
    handleEmojiMenuStatus,
    status,
  };
};

export default useChatActions;
