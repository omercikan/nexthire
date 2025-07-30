import CustomInput from "@/components/ui/CustomInput";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalControls from "../../../modalControls/ModalControls";
import InformationMessage from "../../../modalUI/InformationMessage";
import { Form, Formik } from "formik";
import SelectQuestion from "./SelectQuestion";
import { setApplicationData } from "@/lib/redux/features/applicationModal/modalData";
import useValidationSchema from "@/hooks/useValidationSchema";

const Question = () => {
  const {
    additionalQuestionsFromJob: {
      isSelectAnswer,
      isTextAnswer,
      selectQuestions,
      textQuestions,
    },
    applicationData,
  } = useSelector((state: RootState) => state.applicationModalData);
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = useValidationSchema({
    props: [
      {
        control: isTextAnswer,
        key: "text",
        validationData: textQuestions,
        validationMessage: "Bu alan zorunludur",
      },
      {
        control: isSelectAnswer,
        key: "select",
        validationData: selectQuestions,
        validationMessage: "Bir seçenek seçmeniz gerekiyor",
      },
    ],
  });

  const initialValues = useMemo(() => {
    const values: { [key: string]: string } = {};

    if (isTextAnswer) {
      textQuestions.forEach((q, i) => {
        const existingAnswer = applicationData.additionalQuestions.find(
          ({ title }) => title === q.questionTitle
        );

        values[`text_${i}`] = existingAnswer?.answer || "";
      });
    }

    if (isSelectAnswer) {
      selectQuestions.forEach((q, i) => {
        const existingAnswer = applicationData.additionalQuestions.find(
          (answer) => answer.title === q.questionTitle
        );

        values[`select_${i}`] = existingAnswer?.answer || "";
      });
    }

    return values;
  }, [
    isTextAnswer,
    isSelectAnswer,
    selectQuestions,
    textQuestions,
    applicationData.additionalQuestions,
  ]);

  const handleAdditionalQuestions = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    title: string
  ) => {
    const value: string = e.target.value;
    const index = [...textQuestions, ...selectQuestions].findIndex(
      (val) => val.questionTitle === title
    );

    const answer = { title: title, answer: value, index: index };

    const updatedAnswers = applicationData.additionalQuestions.filter(
      (item) => item.title !== title
    );

    updatedAnswers.push(answer);

    dispatch(
      setApplicationData({
        ...applicationData,
        additionalQuestions: updatedAnswers,
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, errors, handleChange }) => (
        <Form>
          <div className="px-6 flex flex-col gap-4">
            {isTextAnswer &&
              textQuestions.map((q, i) => (
                <CustomInput
                  key={i}
                  label={q.questionTitle}
                  type="text"
                  id={`text_${i}`}
                  name={`text_${i}`}
                  value={values[`text_${i}`]}
                  onChange={(e) => {
                    handleChange(e);
                    handleAdditionalQuestions(e, q.questionTitle);
                  }}
                  className="!rounded-[6.4px] !py-1.5 !px-2"
                  labelClass="text-[#00000099] text-sm mb-[2px]"
                />
              ))}

            {isSelectAnswer &&
              selectQuestions.map((q, i) => (
                <SelectQuestion
                  question={q}
                  key={i}
                  index={i}
                  error={errors[`select_${i}`]}
                  id={`select_${i}`}
                  name={`select_${i}`}
                  value={values[`select_${i}`]}
                  onChange={(e) => {
                    handleChange(e);
                    handleAdditionalQuestions(e, q.questionTitle);
                  }}
                />
              ))}
          </div>

          <InformationMessage />
          <ModalControls formValues={values} isErrors={Object.keys(errors)} />
        </Form>
      )}
    </Formik>
  );
};

export default Question;
