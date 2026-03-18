import CustomButton from "@/shared/components/ui/CustomButton";
import { CandidateQuestionIcons } from "../../icon/icon";
import { useDispatch } from "react-redux";
import { addScreeningQuestions } from "../../slice/candidateQuestionSlice";
import { nanoid } from "@reduxjs/toolkit";

const NoneQuestionContent = () => {
  const { QuestionMark, Plus } = CandidateQuestionIcons;
  const dispatch = useDispatch();

  const addQuestion = () => {
    dispatch(
      addScreeningQuestions({
        id: nanoid(),
        question: "",
        type: "Kısa Metin",
        knockout: false,
        required: false,
      }),
    );
  };

  return (
    <div className="bg-[#F9FAFA] rounded-lg mt-8 py-12 flex flex-col items-center border-2 border-[#dee2e4] border-dashed">
      <div className="bg-[#E2EDF5] rounded-full w-12 h-12 grid place-content-center">
        <QuestionMark color="0f74c5" size={24} />
      </div>

      <h3 className="text-[#080c0f] text-sm font-medium mt-4">
        Henüz soru eklenmedi
      </h3>

      <p className="text-[#5e6468] text-sm mt-1">
        Adayları değerlendirmeye yardımcı olacak eleme soruları ekleyin.
      </p>

      <CustomButton
        className="px-3! py-2! bg-[#0f74c5]! hover:opacity-90 rounded-md! text-sm flex items-center gap-2 mt-4! text-[#fcfcfc]"
        handleClick={addQuestion}
      >
        <Plus />
        Soru Ekle
      </CustomButton>
    </div>
  );
};

export default NoneQuestionContent;
