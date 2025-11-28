import React, { ChangeEventHandler, Ref } from "react";

const FileInput = ({
  onChange,
  ref,
  id,
  accept,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  ref: Ref<HTMLInputElement>;
  id: string;
  accept: string;
}) => {
  return (
    <input
      type="file"
      hidden
      id={id}
      accept={accept}
      onChange={onChange}
      ref={ref}
    />
  );
};

export default FileInput;
