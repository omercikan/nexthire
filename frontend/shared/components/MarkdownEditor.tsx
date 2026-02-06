import { commands } from "@uiw/react-md-editor";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MarkdownEditor = ({
  label,
  field,
  placeholder,
  error = "",
  className = "",
  lengthErrorMessage = "",
}: {
  field: string;
  placeholder: string;
  lengthErrorMessage: string;
  error: string | undefined;
  label: string;
  className?: string;
}) => {
  const { register, watch, setValue, clearErrors, setError } = useFormContext();

  const handleChange = (value: string) => {
    setValue(field, value);

    switch (watch(field).length) {
      case 0:
        return setError(field, { message: lengthErrorMessage });
      default:
        return clearErrors(field);
    }
  };

  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm">{label}</label>

      <MDEditor
        {...register(field)}
        value={watch(field)}
        onChange={(value) => handleChange(value as string)}
        className={error ? "border border-[#D91B1B] mb-1.5" : "mb-4"}
        textareaProps={{
          placeholder,
          autoFocus: true,
        }}
        data-color-mode="light"
        commands={[
          commands.group(
            [
              commands.heading1,
              commands.heading2,
              commands.heading3,
              commands.heading4,
              commands.heading5,
              commands.heading6,
            ],
            {
              name: "title",
              groupName: "title",
              buttonProps: {
                "aria-label": "Başlık Boyutu Seç",
                title: "Başlık Boyutları",
              },
            },
          ),
          commands.bold,
          commands.italic,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.strikethrough,
          commands.link,
        ]}
      />

      {error && <div className="text-[#D91B1B] text-sm mb-1.5">{error}</div>}
    </div>
  );
};

export default MarkdownEditor;
