import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SidebarImageProps } from "../../types/dashboard.types";

const smallLogo =
  "https://res.cloudinary.com/dvolwkh6r/image/upload/v1756551041/nexthire-small_qe4vra.png";

const largeLogo =
  "https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png";

const SidebarImage = ({
  width,
  height,
  imageClassName,
  linkClassName,
  isSmallLogo,
}: SidebarImageProps) => {
  return (
    <Link href="/" className={linkClassName ?? ""}>
      <Image
        src={isSmallLogo ? smallLogo : largeLogo}
        alt="NextHire"
        width={width}
        height={height}
        className={imageClassName ?? ""}
      />
    </Link>
  );
};

export default SidebarImage;
