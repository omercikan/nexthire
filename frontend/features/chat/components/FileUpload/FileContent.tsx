import Image from "next/image";
import Upload from "@/public/assets/upload.png";
import useDragActions from "./hooks/useDragActions";

const FileContent = () => {
  const { onDragOver, onDragLeave, onDrop, dragOverClass } = useDragActions();

  return (
    <div
      className={`p-5 mx-auto flex flex-col items-center border-2 border-[#1568E2] border-dashed rounded-lg transition-all duration-300 ease-in ${dragOverClass}`}
      onDragOver={(e) => onDragOver(e)}
      onDragLeave={() => onDragLeave()}
      onDrop={(e) => onDrop(e)}
    >
      <Image src={Upload} width={35} alt="File Upload Icon" quality={100} />

      <h3 className="text-center text-[15px] mt-4">
        Bir dosya seçin veya buraya sürükleyip bırakın
      </h3>

      <p className="text-[#A9ACB4] text-sm">
        PDF, DOC, DOCX formatları, 6 MB&apos;a kadar
      </p>

      <label
        htmlFor="chatFile"
        className="bg-white cursor-pointer font-medium border text-sm border-[#1568E2] rounded-lg! mt-4 text-[#1568E2] py-1.5 px-3"
      >
        Dosya Seç
      </label>
    </div>
  );
};

export default FileContent;
