import Link from "next/link";
import React from "react";
import styles from "./link-hover.module.scss";

const FooterMenu = ({
  menuTitle,
  items,
}: {
  menuTitle: string;
  items: { item: string; link: string }[];
}) => {
  return (
    <div className="text-white max-md:p-0 max-md:mt-[20px] p-[15px] min-lg:flex-[1] justify-self-center">
      <h2 className="text-lg font-medium mb-[25px]">{menuTitle}</h2>

      {
        <ul className="w-full">
          {items.map((item, index) => (
            <li key={index} className="text-sm not-last:mb-3">
              <Link href={item.link} className={styles.footerLink}>
                <span></span>
                {item.item}
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default FooterMenu;
