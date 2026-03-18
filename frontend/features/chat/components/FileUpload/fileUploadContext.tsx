import { createContext, ReactNode, useState } from "react";

interface FileUploadContext {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const FileUploadContext = createContext<FileUploadContext>({
  file: undefined,
  setFile: () => undefined,
});

const FileUploadContextProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File>();

  return (
    <FileUploadContext.Provider value={{ file, setFile }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadContextProvider;
