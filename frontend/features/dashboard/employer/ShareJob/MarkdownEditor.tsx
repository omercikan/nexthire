import { commands } from "@uiw/react-md-editor";
import { useFormContext } from "react-hook-form";
import { shareJobFormSchemaType } from "./validations/formValidation";
import dynamic from "next/dynamic";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MarkdownEditor = () => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext<shareJobFormSchemaType>();

  const handleChange = (value: string) => {
    setValue("jobDescription", value);

    switch (watch("jobDescription").length) {
      case 0:
        return setError("jobDescription", {
          message: "Pozisyona ait iş tanımı ve sorumlulukları giriniz",
        });
      default:
        return clearErrors("jobDescription");
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm">İş Açıklaması</label>

      <MDEditor
        {...register("jobDescription")}
        value={watch("jobDescription")}
        onChange={(value) => handleChange(value as string)}
        className={
          errors.jobDescription ? "border border-[#D91B1B] mb-1.5" : "mb-4"
        }
        textareaProps={{
          placeholder: "İş tanımı, aranan nitelikler, çalışma şekli...",
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
            }
          ),
          commands.bold,
          commands.italic,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.strikethrough,
          commands.link,
        ]}
      />

      {errors.jobDescription && (
        <div className="text-[#D91B1B] text-sm mb-1.5">
          {errors.jobDescription?.message}
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
