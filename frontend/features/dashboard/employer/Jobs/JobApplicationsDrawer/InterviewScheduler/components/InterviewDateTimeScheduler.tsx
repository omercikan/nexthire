import CustomButton from "@/shared/components/ui/CustomButton";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import CalendarTable from "./CalendarTable";
import { motion } from "framer-motion";

const InterviewDateTimeScheduler = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentNavDate, setCurrentNavDate] = useState(new Date());
  const currentYear = currentNavDate.getFullYear();
  const currentMonth = currentNavDate.getMonth();
  const shortMonthName = currentNavDate.toLocaleString("tr-TR", {
    month: "short",
  });

  const handleMonthChange = (direction: "increment" | "decrement") => {
    const step = direction === "increment" ? 1 : -1;
    setCurrentNavDate(new Date(currentYear, currentMonth + step, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="p-3 border border-border mt-2 absolute top-full rounded-md w-fit flex flex-col gap-4 bg-white z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <nav className="flex items-center gap-1 justify-between">
        <CustomButton
          className="p-2! bg-transparent! hover:bg-[#EDF2F8]! rounded-md!"
          handleClick={() => handleMonthChange("decrement")}
        >
          <LuChevronLeft color="050C13" />
        </CustomButton>

        <time dateTime="2026" className="text-[#050C13] font-medium text-sm">
          {shortMonthName} {currentYear}
        </time>

        <CustomButton
          className="p-2! bg-transparent! hover:bg-[#EDF2F8]! rounded-md!"
          handleClick={() => handleMonthChange("increment")}
        >
          <LuChevronRight color="050C13" />
        </CustomButton>
      </nav>

      <CalendarTable
        currentMonth={currentMonth}
        currentYear={currentYear}
        setIsOpen={setIsOpen}
      />
    </motion.div>
  );
};

export default InterviewDateTimeScheduler;
