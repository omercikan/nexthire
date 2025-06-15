import useCreateArray from "@/hooks/useCreateArray";
import useJobFilter from "@/hooks/useJobFilter";
import useScroll from "@/hooks/useScroll";
import { setPagination } from "@/lib/redux/features/filterJobs/filters";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React from "react";
import { useDispatch } from "react-redux";

/**
 * Renders the pagination component for job listings.
 *
 * @param countJobs - The total number of job items (used to calculate page count).
 * @returns A MUI Pagination component wrapped in a Stack, used for navigating job pages.
 */

const JobPagination = ({ countJobs }: { countJobs: number }) => {
  const dispatch = useDispatch();
  const { filterJob } = useJobFilter();
  const { applyScroll } = useScroll();
  const paginationButtons = useCreateArray(
    countJobs < 10 ? Math.floor(10 / countJobs - 1) : Math.ceil(countJobs / 10)
  );
  const pageCount = paginationButtons?.length;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const nextPage = 10 * value;
    const prevPage = nextPage - 10;
    dispatch(
      setPagination({
        nextPageValue: nextPage,
        prevPageValue: prevPage,
      })
    );

    filterJob();
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
      <Pagination
        count={pageCount}
        size="large"
        onChange={handleChangePage}
        showFirstButton={pageCount >= 10 ? true : false}
        showLastButton={pageCount >= 10 ? true : false}
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

export default JobPagination;
