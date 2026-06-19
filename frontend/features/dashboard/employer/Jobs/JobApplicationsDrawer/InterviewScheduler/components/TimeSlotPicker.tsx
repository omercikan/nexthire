import { useDispatch, useSelector } from "react-redux";
import { TIME_SLOTS, TimeSlot } from "../constants/dateConstants";
import { LuCheck, LuChevronUp, LuChevronDown } from "react-icons/lu";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { setError, setScheduledTime } from "../interviewSchedulerSlice";
import { Dispatch, SetStateAction, useEffect } from "react";
import useScrollControls from "../hooks/useScrollControls";
import { createPortal } from "react-dom";

const TimeSlotPicker = ({
  setIsOpenTime,
  cords,
}: {
  setIsOpenTime: Dispatch<SetStateAction<boolean>>;
  cords: { top: number; left: number; width: number };
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const scheduledTime = useSelector(
    (state: RootState) => state.interviewScheduler.scheduledTime,
  );

  const {
    ulRef,
    scrollTop,
    stopScrolling,
    startScrollUp,
    setMaxScroll,
    startScrollDown,
    handleScroll,
    maxScroll,
  } = useScrollControls();

  const handleSelectTime = (time: string) => {
    dispatch(setScheduledTime(time));
    dispatch(setError({ scheduledTime: "" }));
    setIsOpenTime(false);
  };

  useEffect(() => {
    if (!ulRef.current || !scheduledTime) return;

    const index = TIME_SLOTS.indexOf(scheduledTime as TimeSlot);
    if (index === -1) return;

    const itemHeight = ulRef.current.scrollHeight / TIME_SLOTS.length;
    ulRef.current.scrollTop =
      itemHeight * index - ulRef.current.clientHeight / 2 + itemHeight / 2;
  }, [scheduledTime, ulRef]);

  return createPortal(
    <div
      className="w-37.5 fixed z-51"
      style={{
        top: scrollTop > 0 ? cords.top + 8 : cords.top,
        left: cords.left,
      }}
    >
      <button
        className="bg-white text-black absolute w-full left-0 text-center top-0 flex justify-center z-10 rounded-t-md border-x border-t border-border py-1"
        style={{ visibility: scrollTop > 0 ? "visible" : "hidden" }}
        onMouseEnter={startScrollUp}
        onMouseLeave={stopScrolling}
      >
        <LuChevronUp />
      </button>

      <ul
        ref={(el) => {
          ulRef.current = el;
          if (el) setMaxScroll(el.scrollHeight - el.clientHeight);
        }}
        onScroll={handleScroll}
        className="relative bg-white border border-border p-1.25 mt-2 rounded-md w-full h-87.5 shadow-md modal-scrollbar group"
      >
        {TIME_SLOTS.map((time) => (
          <li
            key={time}
            className={`text-foreground py-1.5 px-2 text-sm rounded-md transition-colors hover:bg-[#EDF2F8] flex items-center justify-between cursor-pointer ${scheduledTime === time ? "not-group-hover:bg-[#EDF2F8]" : ""}`}
            onClick={() => handleSelectTime(time)}
          >
            {time}

            {scheduledTime === time ? <LuCheck /> : null}
          </li>
        ))}
      </ul>

      <button
        className="bg-white text-black absolute w-full left-0 flex justify-center bottom-0 z-10 rounded-b-md border-x border-b border-border py-1"
        style={{ visibility: scrollTop < maxScroll ? "visible" : "hidden" }}
        onMouseEnter={startScrollDown}
        onMouseLeave={stopScrolling}
      >
        <LuChevronDown />
      </button>
    </div>,
    document.body,
  );
};

export default TimeSlotPicker;
