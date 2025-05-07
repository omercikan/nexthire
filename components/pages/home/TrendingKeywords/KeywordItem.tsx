import { routeFormatter } from "@/lib/routeFormat";
import Link from "next/link";
import React from "react";

const KeywordItem = ({
  keyword,
}: {
  keyword: {
    id: number;
    keyword: string;
  };
}) => {
  return (
    <li key={keyword.id}>
      <Link
        className="keyword-link"
        href={`/is-ilanlari/?${new URLSearchParams({
          meslek: routeFormatter(keyword.keyword),
        })}`}
      >
        {keyword.keyword}
      </Link>
    </li>
  );
};

export default KeywordItem;
