import { calculateCVSize } from "@/shared/utils/calculateCvSize";
import { FaFilePdf } from "react-icons/fa6";
import { TbFileTypeDocx } from "react-icons/tb";

interface FileMessageProps {
  file: {
    type: string;
    name: string;
    size: number;
  } | null;
}

const FileMessage: React.FC<FileMessageProps> = ({ file }) => {
  return (
    <div className="mt-5 border border-[#E7E7E7] p-4 rounded-xl flex justify-between items-center ">
      <div className="flex items-center gap-x-2 leading-0">
        {file?.type.includes("pdf") ? (
          <FaFilePdf size={22} color="F40F02" />
        ) : (
          <TbFileTypeDocx size={22} color="2B579A" />
        )}

        <div className="">
          <span className="block text-[#0B0B0B] text-xs font-semibold w-38 whitespace-nowrap overflow-hidden text-ellipsis">
            {file?.name}
          </span>

          <span className="text-[#6D6D6D] text-xs">
            {calculateCVSize(Number(file?.size))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
