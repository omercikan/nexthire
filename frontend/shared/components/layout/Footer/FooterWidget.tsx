import React from "react";
import Image from "next/image";
import Link from "next/link";

const FooterWidget = () => {
  return (
    <div className="pt-0 p-[15px] min-lg:flex-[1.5] max-md:p-0">
      <Link href="#header">
        <Image
          src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1746880573/NextHire-3_wj0va1.png"
          alt="NextHire"
          width={154}
          height={50}
          draggable={false}
        />
      </Link>

      <div className="text-white mt-2">
        <h2 className="text-lg font-medium">Bizi arayın</h2>
        <h3 className="text-lg font-medium">123 456 7890</h3>

        <address className="text-sm not-italic mt-2 w-[250px]">
          Maslak Mahallesi, Maslak 1453 Sitesi, A Blok, Kat:10, 34398
          Sarıyer/İstanbul
        </address>
      </div>
    </div>
  );
};

export default FooterWidget;
