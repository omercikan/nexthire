import { DragEvent, MouseEvent, useContext, useState } from "react";
import { FileUploadContext } from "../fileUploadContext";

const useDragActions = () => {
  const [dragOver, setDragOver] = useState(false);
  const { setFile } = useContext(FileUploadContext);
  const dragOverClass = dragOver ? "bg-[#E7F0FD]! border-solid" : "";

  const onDragOver = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files[0];
    if (file) setFile(file);
    setDragOver(false);
  };

  return { onDragOver, onDragLeave, onDrop, dragOverClass };
};

export default useDragActions;
