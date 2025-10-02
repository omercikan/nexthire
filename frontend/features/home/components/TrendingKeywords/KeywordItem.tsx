import ItemFilterText from "@/shared/components/ItemFilterText";
import useItemFilterText from "@/shared/hooks/useItemFilterText";
import React from "react";

const KeywordItem = ({
  keyword,
}: {
  keyword: {
    id: number;
    keyword: string;
  };
}) => {
  const { applyItemFilter } = useItemFilterText();

  return (
    <li key={keyword.id}>
      <ItemFilterText
        redirect="/is-ilanlari"
        handleClick={() => applyItemFilter(keyword?.keyword, true, false)}
        linkClassName="keyword-link"
      >
        {keyword.keyword}
      </ItemFilterText>
    </li>
  );
};

export default KeywordItem;
