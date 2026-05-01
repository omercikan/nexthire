import { Stack } from "@mui/material";
import MUIPagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";

const JobListPagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: string;
}) => {
  const isMinCount = totalPages < 6;
  const router = useRouter();

  const handleChangePage = async (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const params = new URLSearchParams();
    params.set("page", String(value));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      className="lg:sticky lg:bottom-0 backdrop-blur-xs p-4 mt-4"
      data-testid="MuiStack-root"
    >
      <MUIPagination
        count={totalPages}
        page={Number(currentPage)}
        size="large"
        onChange={handleChangePage}
        showFirstButton={isMinCount ? false : totalPages >= 10 ? true : false}
        showLastButton={isMinCount ? false : totalPages >= 10 ? true : false}
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

export default JobListPagination;
