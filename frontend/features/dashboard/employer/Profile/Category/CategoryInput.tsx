import CustomButton from "@/shared/components/ui/CustomButton";
import { useRef } from "react";
import useCategoryHandler from "./useCategoryHandler";
import { IoClose } from "react-icons/io5";

const CategoryInput = ({ isSubmitted }: { isSubmitted: boolean }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const { onInput, onKeyDown, removeCategory, categories, isEmpty } =
    useCategoryHandler();
  const isError = !categories.length && isSubmitted;

  return (
    <div>
      <label className="block mb-1.5">Kategori</label>

      <div
        className={`relative border ${isError ? "border-[#D91B1B]" : "border-[#D3E0FE]"} rounded-[15px] cursor-text`}
        onClick={() => editableRef.current?.focus()}
      >
        {categories.length ? (
          <ul className="flex items-center flex-wrap gap-2 text-sm px-4 py-2.5">
            {categories.map((cat, i) => (
              <li
                key={cat + i}
                className="bg-[#D0DFF1] text-[#1967D2] px-3 py-1 rounded-full flex items-center gap-1.5"
              >
                {cat}
                <CustomButton
                  type="button"
                  className="!p-0 !bg-transparent !text-[#1967D2] hover:!text-[#e44343]"
                  handleClick={() => removeCategory(cat)}
                >
                  <IoClose />
                </CustomButton>
              </li>
            ))}
          </ul>
        ) : null}

        <div
          contentEditable
          suppressContentEditableWarning
          ref={editableRef}
          role="textbox"
          aria-label="Kategori girişi"
          aria-multiline="true"
          className="outline-none px-4 py-2.5 min-h-[40.1px] text-sm"
          onInput={onInput}
          onKeyDown={onKeyDown}
        />

        {isEmpty && (
          <span className="text-[#696969] pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 text-sm">
            Kategori yazın ve Enter’a basın
          </span>
        )}
      </div>

      {isError && (
        <div className="text-[#D91B1B] text-sm mt-1">
          En az bir kategori ekleyin
        </div>
      )}
    </div>
  );
};

export default CategoryInput;
