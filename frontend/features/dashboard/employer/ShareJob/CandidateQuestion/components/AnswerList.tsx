import { useDispatch } from "react-redux";
import { CandidateQuestionIcons } from "../icon/icon";
import { AnimatePresence, motion } from "framer-motion";
import { AppDispatch } from "@/shared/redux/store";
import { updateQuestion } from "../slice/candidateQuestionSlice";

interface CandidateAnswerListProps {
  cardId: string;
  items: string[];
  selectedAnswerType: string;
  selectAnswerTypeFn: React.Dispatch<React.SetStateAction<string>>;
  showAnswerListFn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CandidateAnswerList: React.FC<CandidateAnswerListProps> = ({
  cardId,
  items,
  selectedAnswerType,
  selectAnswerTypeFn,
  showAnswerListFn,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAnswerMenu = (item: string) => {
    selectAnswerTypeFn(item);
    showAnswerListFn(false);
    dispatch(updateQuestion({ id: cardId, changes: { type: item } }));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        className="bg-white border border-[#dee2e4] rounded-lg py-2 mt-1 text-sm group absolute top-full z-1"
        initial={{ y: -10, opacity: 0, width: 160 }}
        animate={{ y: 0, opacity: 1, width: 170 }}
        exit={{ y: -10, opacity: 0, width: 160 }}
        transition={{ duration: 0.2 }}
      >
        {items.map((item) => {
          const isSelectedAnswerType = selectedAnswerType === item;
          const selectedAnswerTypeClass = isSelectedAnswerType
            ? "bg-[#1270C0] group-hover:bg-transparent group-hover:text-black text-white"
            : "";

          return (
            <li
              key={item}
              className={`hover:bg-[#1270C0] hover:text-white flex items-center justify-between gap-2 mx-1 py-2 px-2 rounded-md cursor-pointer hover:[&>svg]:text-white ${selectedAnswerTypeClass}`}
              onClick={() => handleAnswerMenu(item)}
            >
              {item}

              {isSelectedAnswerType && (
                <CandidateQuestionIcons.Check
                  className="group-hover:text-[#5e6468]"
                  size={20}
                />
              )}
            </li>
          );
        })}
      </motion.ul>
    </AnimatePresence>
  );
};

export default CandidateAnswerList;
