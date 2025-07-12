import { changeShowMoreResumes } from "@/lib/redux/features/touch";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { RiArrowUpWideLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const ShowMoreResumes = ({
  resumeDataLength,
}: {
  resumeDataLength: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showMoreResumes } = useSelector((state: RootState) => state.touch);

  return (
    <div className="float-end max-[460px]:float-none pt-1">
      <button
        className="text-[#4045ef] font-medium flex items-center gap-x-1 hover:bg-[#EBF4FD] py-1.5 px-2 rounded-[6.4px] transition-colors duration-300"
        onClick={() => dispatch(changeShowMoreResumes())}
      >
        <span>
          {showMoreResumes
            ? "Daha az göster"
            : `${resumeDataLength - 2} Özgeçmiş daha göster`}
        </span>

        {showMoreResumes ? (
          <RiArrowUpWideLine size={20} strokeWidth={0.5} />
        ) : (
          <RiArrowDownWideLine size={20} strokeWidth={0.5} />
        )}
      </button>
    </div>
  );
};

export default ShowMoreResumes;
