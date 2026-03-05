import CustomButton from "@/shared/components/ui/CustomButton";
import { ChatIcons } from "../../icons/ChatIcon";
import { RefObject } from "react";
import useSendMessage from "./hooks/useSendMessage";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";

const SendButton = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  const { send: Send } = ChatIcons;
  const { handleSendMessage } = useSendMessage();
  const { isLoading } = useSelector((state: RootState) => state.chatData);

  return (
    <CustomButton
      className="p-0! bg-transparent!"
      isSubmitting={isLoading}
      handleClick={() => {
        handleSendMessage(inputRef.current?.value ?? "");

        if (inputRef.current) inputRef.current.value = "";
      }}
    >
      <Send color="003DF5" size={25} />
    </CustomButton>
  );
};

export default SendButton;
