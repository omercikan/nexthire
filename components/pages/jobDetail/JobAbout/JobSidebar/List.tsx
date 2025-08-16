import React from "react";
import ListItem from "./ListItem";
import { OverviewList } from "./sidebar.types";

const List = ({ listItems }: { listItems: OverviewList[] }) => {
  return (
    <ul className="flex flex-col gap-[15px]">
      {listItems.map((item) => (
        <ListItem key={item.id} list={item} />
      ))}
    </ul>
  );
};

export default List;
