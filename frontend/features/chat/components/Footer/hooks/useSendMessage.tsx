import { AuthContext } from "@/features/auth/authContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import AuthToast from "../../AuthToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { socketService } from "@/features/chat/services/socketService";
import { addMessage } from "@/features/chat/slice/chatData-slice";

const useSendMessage = () => {
  const { user } = useContext(AuthContext);
  const chatData = useSelector((state: RootState) => state.chatData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (chatData.isLoading) return;

    if (!user) {
      return toast.custom(<AuthToast />, { id: "AIChatNoAuth" });
    }

    if (message) {
      dispatch(addMessage({ from: "user", message: message }));
      socketService.sendMessage(message);
    }
  };

  return { handleSendMessage };
};

export default useSendMessage;
