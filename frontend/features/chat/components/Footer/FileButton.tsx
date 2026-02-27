import FileInput from "@/shared/components/ui/FileInput";
import { ChatIcons } from "../../icons/ChatIcon";

const FileButton = () => {
  const { attach: Attach } = ChatIcons;

  return (
    <>
      <label htmlFor="chatFile" className="cursor-pointer">
        <Attach color="667085" size={22} />
      </label>

      <FileInput
        id="chatFile"
        accept=".pdf"
        onChange={(e) => console.log(e.target.files?.[0])}
      />
    </>
  );
};

export default FileButton;
