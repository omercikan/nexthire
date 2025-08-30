import { setCollapseMenu } from "@/lib/redux/features/dashboard/userDashboardSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const DashboardCollapse = () => {
  const collapseMenu = useSelector(
    (state: RootState) => state.userDashboard.collapseMenu
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleCollapseMenu = () => dispatch(setCollapseMenu());

  return (
    <div className="absolute -right-4 top-[80px] z-10 -translate-y-1/2 max-[992px]:hidden">
      {collapseMenu ? (
        <button
          aria-label="Menüyü Genişlet"
          className="border border-[#E2E8F0] bg-white w-8 h-8 rounded-full grid place-content-center"
          onClick={handleCollapseMenu}
        >
          <FiChevronRight color="081021" size={18} />
        </button>
      ) : (
        <button
          aria-label="Menüyü Daralt"
          className="border border-[#E2E8F0] bg-white w-8 h-8 rounded-full grid place-content-center"
          onClick={handleCollapseMenu}
        >
          <FiChevronLeft color="081021" size={18} />
        </button>
      )}
    </div>
  );
};

export default DashboardCollapse;
