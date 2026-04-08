import { AppDispatch, RootState } from "@/shared/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionById,
  updateQuestion,
} from "../slice/candidateQuestionSlice";

interface Option {
  id: string;
  value: string;
}

const useMultipleInput = (cardId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector((state: RootState) =>
    selectQuestionById(state, cardId),
  );
  const [options, setOptions] = useState<Option[]>(
    question.options?.map((option) => ({
      id: nanoid(),
      value: option,
    })) as Option[],
  );

  const addOption = () => {
    if (options.length === 10) {
      return toast.error("Bir soru için en fazla 10 seçenek eklenebilir.", {
        id: "OptionError",
      });
    }

    setOptions([...options, { id: nanoid(), value: "" }]);
  };

  const updateOption = (value: string, index: number) => {
    const newOptions = [...(question.options ?? [])];
    newOptions[index] = value;
    const newValue = (options[index].value = value);

    setOptions(
      options.map((option, i) =>
        i === index ? { ...option, value: newValue } : { ...option },
      ),
    );

    dispatch(
      updateQuestion({
        id: cardId,
        changes: {
          options: newOptions,
        },
      }),
    );
  };

  const removeOption = (id: string) => {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);

    const optionValues = newOptions.map((option) => option.value);

    dispatch(
      updateQuestion({
        id: cardId,
        changes: {
          options: optionValues,
        },
      }),
    );
  };

  return {
    options,
    question,
    setOptions,
    addOption,
    updateOption,
    removeOption,
  };
};

export default useMultipleInput;
