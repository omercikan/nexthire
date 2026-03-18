import { AppDispatch, RootState } from "@/shared/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionById,
  updateQuestion,
} from "../slice/candidateQuestionSlice";

const useMultipleInput = (cardId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector((state: RootState) =>
    selectQuestionById(state, cardId),
  );
  const [options, setOptions] = useState<{ id: string; value: string }[]>([
    { id: nanoid(), value: "" },
    { id: nanoid(), value: "" },
  ]);

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
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  return { options, setOptions, addOption, updateOption, removeOption };
};

export default useMultipleInput;
