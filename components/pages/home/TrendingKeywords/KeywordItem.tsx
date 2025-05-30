import useJobFilter from "@/hooks/useJobFilter";
import {
  selectFiltersItem,
  selectJobKeyword,
} from "@/lib/redux/features/filterJobs/filters";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const KeywordItem = ({
  keyword,
}: {
  keyword: {
    id: number;
    keyword: string;
  };
}) => {
  const dispatch = useDispatch();
  const { filterJob } = useJobFilter();

  return (
    <li key={keyword.id}>
      <Link
        className="keyword-link"
        href="/is-ilanlari"
        onClick={() => {
          dispatch(selectFiltersItem([keyword?.keyword]));
          dispatch(selectJobKeyword([keyword?.keyword]));
          filterJob();
        }}
      >
        {keyword.keyword}
      </Link>
    </li>
  );
};

export default KeywordItem;
