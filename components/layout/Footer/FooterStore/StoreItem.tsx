import Link from "next/link";
import React, { ReactNode } from "react";

const StoreItem = ({
  storeLink,
  icon,
  storeText,
}: {
  storeLink: string;
  icon: ReactNode;
  storeText: string;
}) => {
  return (
    <div className="mt-5">
      <Link
        target="_blank"
        href={storeLink}
        className="footer-store-item"
        rel="noopener noreferrer"
      >
        {icon}

        <div>
          <span className="text-sm">İndir</span>
          <p className="font-medium">{storeText}</p>
        </div>
      </Link>
    </div>
  );
};

export default StoreItem;
