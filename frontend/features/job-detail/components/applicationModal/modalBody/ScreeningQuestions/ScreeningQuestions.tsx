import { FormProvider } from "react-hook-form";
import NumberQuestion from "./NumberQuestion";
import useQuestionsForm from "./hooks/useQuestionsForm";
import SelectQuestion from "./SelectQuestion";
import TextQuestion from "./TextQuestion";
import MultipleQuestion from "./MultipleQuestion";
import ModalFooter from "../ModalFooter";

const ScreeningQuestions = () => {
  const {
    methods,
    handleSubmit,
    errors,
    hasErrors,
    areRequiredFieldsFilled,
    screeningQuestions,
  } = useQuestionsForm();

  return (
    <div className="h-[calc(100%-249.58px)] sm:h-102.5 overflow-auto">
      <h3 className="text-[#000000E6] font-medium mb-3 px-6 max-sm:px-3">
        Ek Sorular
      </h3>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((values) => values)}>
          <div className="px-6 flex flex-col gap-4">
            {screeningQuestions?.map((item) => {
              switch (item.type) {
                case "Sayı":
                  return (
                    <NumberQuestion
                      key={item.id}
                      id={item.id}
                      question={item.question}
                      required={item.required}
                      error={errors[item.question]?.message as string}
                    />
                  );
                case "Evet / Hayır":
                  return (
                    <SelectQuestion
                      key={item.id}
                      question={item.question}
                      required={item.required}
                      error={errors[item.question]?.message as string}
                    />
                  );
                case "Uzun Metin":
                  return (
                    <TextQuestion
                      key={item.id}
                      id={item.id}
                      question={item.question}
                      error={errors[item.question]?.message as string}
                      characterLimit={item.characterLimit as string}
                      required={item.required}
                    />
                  );
                case "Kısa Metin":
                  return (
                    <TextQuestion
                      key={item.id}
                      id={item.id}
                      question={item.question}
                      error={errors[item.question]?.message as string}
                      characterLimit={item.characterLimit as string}
                      required={item.required}
                    />
                  );
                case "Çoklu Seçim":
                  return (
                    <MultipleQuestion
                      key={item.id}
                      id={item.id}
                      question={item.question}
                      error={errors[item.question]?.message as string}
                      characterLimit={item.characterLimit as string}
                      options={item.options as string[]}
                      required={item.required}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>

          <ModalFooter isValid={!hasErrors && areRequiredFieldsFilled} />
        </form>
      </FormProvider>
    </div>
  );
};

export default ScreeningQuestions;
