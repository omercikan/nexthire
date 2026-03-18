import FileHeader from "./FileHeader";
import FileContent from "./FileContent";
import ShowUploadedFile from "./ShowUploadedFile";

const FileContainer = () => {
  return (
    <div className="w-full absolute bottom-full">
      <div
        className={`bg-white bottom-swiper p-6 border-t border-[#E3E3E3] drop-shadow-[#f5f5f5] `}
      >
        <FileHeader />
        <FileContent />
        <ShowUploadedFile />
      </div>
    </div>
  );
};

export default FileContainer;
