import useScroll from "@/shared/hooks/useScroll";
import { RootState } from "@/shared/redux/store";
import { Stack } from "@mui/material";
import MUIPagination from "@mui/material/Pagination";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "./paginationSlice";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";

/**
 * Renders the pagination component for job listings.
 *
 * @param countJobs - The total number of job items (used to calculate page count).
 * @returns A MUI Pagination component wrapped in a Stack, used for navigating job pages.
 */

const Pagination = ({ countJobs }: { countJobs: number }) => {
  const dispatch = useDispatch();
  const { applyScroll } = useScroll();

  const pageCount =
    countJobs < 10 ? Math.floor(10 / countJobs) : Math.ceil(countJobs / 10);
  const isMinCount = countJobs < 6;

  const {
    paginationSlice: { currentPage },
  } = useSelector((state: RootState) => state);
  const { handleFilter } = useJobFilter();

  const handleChangePage = async (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
    handleFilter();

    setTimeout(() => {
      applyScroll(640, 474.57, 386.63);
    }, 0);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      className="lg:sticky lg:bottom-0 bg-white p-4"
      data-testid="MuiStack-root"
    >
      <MUIPagination
        count={isMinCount ? 1 : pageCount}
        page={currentPage}
        size="large"
        onChange={handleChangePage}
        showFirstButton={isMinCount ? false : pageCount >= 10 ? true : false}
        showLastButton={isMinCount ? false : pageCount >= 10 ? true : false}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "#1967d2 !important",
            color: "#fff !important",
            cursor: "default",
            pointerEvents: "none",
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
