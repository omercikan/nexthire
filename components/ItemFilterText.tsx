import Link from "next/link";
import React, { ReactNode } from "react";

const ItemFilterText = ({
  redirect,
  children,
  linkClassName,
  handleClick,
}: {
  redirect: string;
  children: ReactNode;
  linkClassName?: string;
  handleClick?: () => void;
}) => {
  return (
    <>
      <Link href={redirect} onClick={handleClick} className={linkClassName}>
        {children}
      </Link>{" "}
    </>
  );
};

export default ItemFilterText;
