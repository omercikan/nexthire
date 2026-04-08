import CustomButton from "@/shared/components/ui/CustomButton";
import Label from "../Label";
import { CandidateQuestionIcons } from "../../icon/icon";
import useMultipleInput from "../../hooks/useMultipleInput";

const MultipleInput = ({ cardId }: { cardId: string }) => {
  const { options, question, addOption, updateOption, removeOption } =
    useMultipleInput(cardId);

  return (
    <div>
      <Label label="Seçenekler" htmlFor="options" />

      <div className="flex flex-col space-y-2">
        {options.map((option, i) => (
          <div key={option.id}>
            <div className="flex items-center justify-between gap-2">
              <input
                className={`candidate-question-input w-full ${
                  !options[i].value && !question.options?.[i]
                    ? "candidate-question-input-error"
                    : ""
                }`}
                placeholder={`Seçenek ${i + 1}`}
                value={question.options?.[i] ?? ""}
                onChange={(e) => updateOption(e.target.value, i)}
              />

              {options.length > 2 && (
                <CustomButton
                  className="bg-transparent! p-0!"
                  handleClick={() => removeOption(option.id)}
                >
                  <CandidateQuestionIcons.Close color="5e6468" />
                </CustomButton>
              )}
            </div>

            {!options[i].value && !question.options?.[i] && (
              <p className="text-[#D91B1B] text-sm mt-1 mb-2">
                bu alan boş bırakılamaz
              </p>
            )}
          </div>
        ))}
      </div>

      <CustomButton
        className="px-2.5! py-2! text-[#080C0F]! flex items-center gap-1.5 text-xs font-medium border border-[#dee2e4] bg-[#f7f9fa]! hover:bg-[#1270C0]! hover:text-white! rounded-md! mt-3"
        handleClick={addOption}
      >
        <CandidateQuestionIcons.Plus size={15} />
        Seçenek Ekle
      </CustomButton>
    </div>
  );
};

export default MultipleInput;
