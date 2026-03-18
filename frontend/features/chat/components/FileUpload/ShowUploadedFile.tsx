import { useContext } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { TbFileTypeDocx } from "react-icons/tb";
import { FileUploadContext } from "./fileUploadContext";
import { calculateCVSize } from "@/shared/utils/calculateCvSize";
import CustomButton from "@/shared/components/ui/CustomButton";
import { IoCloseCircleOutline } from "react-icons/io5";

const ShowUploadedFile = () => {
  const { file, setFile } = useContext(FileUploadContext);

  if (!file) return;

  return (
    <div className="mt-5 border border-[#E7E7E7] p-4 rounded-xl flex justify-between items-center ">
      <div className="flex items-center gap-x-2 leading-0">
        {file.type.includes("pdf") ? (
          <FaFilePdf size={22} color="F40F02" />
        ) : (
          <TbFileTypeDocx size={22} color="2B579A" />
        )}

        <div className="">
          <span className="block text-[#0B0B0B] text-xs font-semibold w-38 whitespace-nowrap overflow-hidden text-ellipsis">
            {file.name}
          </span>

          <span className="text-[#6D6D6D] text-xs">
            {calculateCVSize(file.size)}
          </span>
        </div>
      </div>

      <CustomButton
        className="p-0! bg-transparent!"
        handleClick={() => setFile(undefined)}
      >
        <IoCloseCircleOutline color="858585" size={20} />
      </CustomButton>
    </div>
  );
};

export default ShowUploadedFile;
