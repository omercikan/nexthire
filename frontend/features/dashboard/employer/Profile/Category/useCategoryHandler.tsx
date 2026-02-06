import { KeyboardEvent, useContext, useState } from "react";
import showCategoryToast from "./categoryNotifications";
import { AuthContext } from "@/features/auth/authContext";
import { Employer } from "@/shared/types/models/employer";

const useCategoryHandler = () => {
  const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState<string[]>(
    (user as Employer).categories ?? [],
  );
  const [categoryValue, setCategoryValue] = useState("");

  const onInput = (e: KeyboardEvent<HTMLDivElement>) => {
    const raw = e.currentTarget.innerText;
    const value = raw.replace(/\u00a0/g, " ").trim();

    setCategoryValue(value);

    if (value === "") {
      e.currentTarget.innerHTML = "";
      setCategoryValue("");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent.trim();

    switch (e.key) {
      case "Enter":
        e.preventDefault();

        const hasError = showCategoryToast({ categories, value });

        if (hasError || !value) {
          e.currentTarget.innerHTML = "";
          return;
        }

        setCategories((prev) => [...prev, value]);

        setCategoryValue("");
        e.currentTarget.innerHTML = "";
        break;
      case "Backspace":
        if (categories.length && !categoryValue.length) {
          const findLastIndex = categories.findLastIndex((cat) => cat);
          return setCategories(categories.slice(length, findLastIndex));
        }
    }
  };

  const removeCategory = (deleteValue: string) => {
    setCategories(categories.filter((cat) => cat !== deleteValue));
  };

  return {
    onInput,
    onKeyDown,
    removeCategory,
    categories,
    isEmpty: !categoryValue && !categories.length,
  };
};

export default useCategoryHandler;
