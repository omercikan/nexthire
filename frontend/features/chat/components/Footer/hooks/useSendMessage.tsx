import { AuthContext } from "@/features/auth/authContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import AuthToast from "../../AuthToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { socketService } from "@/features/chat/services/socketService";
import { addMessage } from "@/features/chat/slice/chatData-slice";
import { FileUploadContext } from "../../FileUpload/fileUploadContext";
import { updateOptionState } from "../../OptionsMenu/slice/optionMenuSlice";

const useSendMessage = () => {
  const { user } = useContext(AuthContext);
  const { file, setFile } = useContext(FileUploadContext);
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

    if (file) {
      const { name, size, type } = file;

      dispatch(
        addMessage({
          from: "user",
          message: message,
          file: { name, size, type },
        }),
      );

      dispatch(updateOptionState("cv analiz modunu kapat"));
      socketService.sendCvAnalyze(message, file);
      setFile(undefined);
      return;
    }

    if (message) {
      dispatch(addMessage({ from: "user", message: message, file: null }));
      socketService.sendMessage(message);
    }
  };

  return { handleSendMessage };
};

export default useSendMessage;
