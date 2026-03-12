import { RootState } from "@/shared/redux/store";
import { useSelector } from "react-redux";

const useChatClassName = () => {
  const {
    optionMenuSlice: { isFullScreen },
    chatSlice: { isOpenChat },
  } = useSelector((state: RootState) => state);

  let className;

  if (isOpenChat) {
    className =
      "w-[444.6px] max-md:w-full max-md:right-0! max-md:bottom-0! max-md:h-full rounded-[30px] border border-[#6670854f]";
  }

  if (isOpenChat) {
    if (isFullScreen) {
      className = "w-full right-0! bottom-0!";
    }
  }

  return className;
};

export default useChatClassName;
