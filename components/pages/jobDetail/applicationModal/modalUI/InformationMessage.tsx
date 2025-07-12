import Link from "next/link";
import React from "react";

const InformationMessage = () => {
  return (
    <div className="px-6 pt-4 pb-2 border-b border-[#E8E8E8]">
      <p className="text-[#00000099] text-xs">
        Bu başvurunun gönderilmesi,{" "}
        <strong className="font-semibold">NextHire</strong> profilinizde
        herhangi bir değişiklik yapmaz. <br className="max-[500px]:hidden" /> Başvurular,{" "}
        <strong className="font-semibold">NextHire</strong> altyapısı ile
        desteklenmektedir. Daha fazla bilgi için{" "}
        <Link href="#" className="text-[#4045ef] hover:underline">
          <strong className="font-semibold">Yardım Merkezi&apos;ni</strong>
        </Link>{" "}
        ziyaret edebilirsiniz.
      </p>
    </div>
  );
};

export default InformationMessage;
