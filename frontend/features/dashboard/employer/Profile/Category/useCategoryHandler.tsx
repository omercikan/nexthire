import { KeyboardEvent, useContext, useEffect, useState } from "react";
import showCategoryToast from "./categoryNotifications";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { setCategories } from "./category-slice";
import { AuthContext } from "@/features/auth/authContext";
import { Employer } from "@/shared/types/models/employer";

const useCategoryHandler = () => {
  const { categories } = useSelector((state: RootState) => state.categorySlice);
  const dispatch = useDispatch<AppDispatch>();
  const [categoryValue, setCategoryValue] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) dispatch(setCategories((user as Employer)?.categories ?? []));
  }, [dispatch, user]);

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

        dispatch(setCategories([...categories, value]));

        setCategoryValue("");
        e.currentTarget.innerHTML = "";
        break;
      case "Backspace":
        if (categories.length && !categoryValue.length) {
          const findLastIndex = categories.findLastIndex((cat) => cat);
          return dispatch(
            setCategories(categories.slice(length, findLastIndex)),
          );
        }
    }
  };

  const removeCategory = (deleteValue: string) => {
    dispatch(setCategories(categories.filter((cat) => cat !== deleteValue)));
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
