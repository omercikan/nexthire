import CustomButton from "@/shared/components/ui/CustomButton";
import useModalControl from "./hooks/useModalControl";

interface ModalControlsProps {
  isValid: boolean;
}

const ModalControls: React.FC<ModalControlsProps> = ({ isValid }) => {
  const {
    step,
    hasScreeningQuestions,
    isLoading,
    nextStep,
    prevStep,
    sendApplication,
  } = useModalControl(isValid);

  return (
    <div className="py-4 flex sm:justify-end gap-2">
      {step !== 1 && (
        <CustomButton
          text="Geri"
          type="button"
          className="hover:bg-[#EBF4FD]! bg-transparent! text-[#4045ef]! font-semibold py-1.5! px-2! rounded-sm!"
          isSubmitting={false}
          handleClick={prevStep}
        />
      )}

      {step === 4 ? (
        <CustomButton
          text="Başvuruyu gönder"
          isSubmitting={isLoading}
          handleClick={sendApplication}
          className={`py-1.5! ${isLoading ? "px-[70.4px]!" : "px-4!"} font-semibold max-sm:ms-auto`}
        />
      ) : (
        <CustomButton
          text={!hasScreeningQuestions && step === 2 ? "incele" : "İleri"}
          isSubmitting={false}
          handleClick={nextStep}
          className="py-1.5! px-4! font-semibold max-sm:ms-auto"
        />
      )}
    </div>
  );
};

export default ModalControls;
