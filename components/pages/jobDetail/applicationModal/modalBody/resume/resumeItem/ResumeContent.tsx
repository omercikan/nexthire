import React from "react";

const ResumeContent = ({
  fileName,
  size,
  uploadTime,
}: {
  fileName: string;
  size: string;
  uploadTime: string;
}) => {
  return (
    <div className="overflow-hidden">
      <h3 className="text-[#000000E6] text-xs font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
        {fileName}
      </h3>
      <p className="text-[#00000099] text-xs pt-1 whitespace-nowrap text-ellipsis">
        {size} · {uploadTime} tarihinde yüklendi
      </p>
    </div>
  );
};

export default ResumeContent;
