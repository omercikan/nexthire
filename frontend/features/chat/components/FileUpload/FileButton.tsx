import FileInput from "@/shared/components/ui/FileInput";
import { ChatIcons } from "../../icons/ChatIcon";
import { ChangeEvent, useContext } from "react";
import { FileUploadContext } from "./fileUploadContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";
import { updateOptionState } from "../OptionsMenu/slice/optionMenuSlice";

const FileButton = () => {
  const { attach: Attach } = ChatIcons;
  const { setFile } = useContext(FileUploadContext);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      dispatch(updateOptionState("cv analiz modunu aç"));
    }
  };

  return (
    <>
      <label htmlFor="chatFile" className="cursor-pointer">
        <Attach color="667085" size={22} />
      </label>

      <FileInput id="chatFile" accept=".pdf" onChange={handleChange} />
    </>
  );
};

export default FileButton;
