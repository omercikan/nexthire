import Link from "next/link";
import React from "react";

const InformationMessage = () => {
  return (
    <div className="pt-4 pb-2 border-b border-[#E8E8E8]">
      <p className="text-[#00000099] text-xs">
        Bu başvuru, <strong className="font-semibold">NextHire</strong>{" "}
        profilinizi etkilemez. Başvurular{" "}
        <strong className="font-semibold">NextHire</strong> altyapısıyla
        yürütülür. Detaylar için{" "}
        <Link href="#" className="text-[#4045ef] hover:underline">
          <strong className="font-semibold">Yardım Merkezi&apos;ni</strong>
        </Link>{" "}
        ziyaret edin.
      </p>
    </div>
  );
};

export default InformationMessage;
