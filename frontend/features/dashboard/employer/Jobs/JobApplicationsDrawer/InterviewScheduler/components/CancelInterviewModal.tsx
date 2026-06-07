import CustomButton from "@/shared/components/ui/CustomButton";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { LuUser, LuCalendar, LuClock } from "react-icons/lu";
import { MdWarningAmber } from "react-icons/md";
import { motion } from "framer-motion";

dayjs.extend(customParseFormat);

interface CancelInterviewModalProps {
  profilePhoto?: string;
  username: string;
  title: string;
  appliedAt: Date;
  setIsCancelInterview: Dispatch<SetStateAction<boolean>>;
}

const CancelInterviewModal = (props: CancelInterviewModalProps) => {
  const { profilePhoto, username, title, appliedAt, setIsCancelInterview } =
    props;

  const formattedDate = dayjs(appliedAt).locale("tr").format("DD MMMM YYYY");
  const formattedTime = dayjs(appliedAt).locale("tr").format("HH:mm");

  return (
    <div
      className="fixed top-0 left-0 backdrop-blur-xs w-full h-full flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsCancelInterview(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
        className="py-8 max-sm:py-4 bg-white w-full max-w-120 max-sm:w-[95%] rounded-xl shadow-sm border border-[#c3c6d64d] flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-sm:flex-col max-sm:text-center items-center gap-4 px-8">
          <div className="shrink-0 w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center">
            <MdWarningAmber color="ba1a1a" size={24} />
          </div>

          <div>
            <h3 className="text-[#141b2b] text-lg font-semibold">
              Mülakatı İptal Et
            </h3>

            <p className="text-[#434654] text-sm">
              Bu mülakatı iptal etmek istediğinizden emin misiniz? Bu işlem geri
              alınamaz.
            </p>
          </div>
        </div>

        <div className="bg-[#f1f3ff] mx-8 border border-[#c3c6d633] p-4 rounded-lg flex max-sm:flex-col gap-4 max-sm:text-center max-sm:items-center">
          {profilePhoto ? (
            <Image
              src={profilePhoto}
              alt={username}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="grid h-12 w-12 shrink-0 place-content-center rounded-full border border-border bg-gray-100 text-gray-600">
              <LuUser size={26} />
            </div>
          )}

          <div>
            <div className="flex flex-col">
              <strong className="text-[#141b2b] text-sm font-medium">
                {username}
              </strong>

              <span className="text-sm text-[#434654]">{title}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-1">
              <div className="flex items-center gap-1 bg-[#e1e8fd] px-2 py-1 border border-[#c3c6d633] rounded-sm text-[#5e6572] text-xs font-medium">
                <LuCalendar /> <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-1 bg-[#e1e8fd] px-2 py-1 border border-[#c3c6d633] rounded-sm text-[#5e6572] text-xs font-medium">
                <LuClock />
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-4 pt-8 max-sm:pt-4 px-8 border-t border-t-[#c3c6d64d]">
          <CustomButton
            text="Vazgeç"
            className="text-[#434654]! max-sm:flex-1 whitespace-nowrap rounded-lg! text-sm font-medium bg-transparent! hover:bg-[#f1f3ff]! border border-[#c3c6d6] py-2! px-6"
            handleClick={() => setIsCancelInterview(false)}
          />
          <CustomButton
            text="Mülakatı İptal Et"
            className="rounded-lg! max-sm:flex-1 whitespace-nowrap text-sm font-medium bg-[#ba1a1a]! hover:bg-[#ba1a1ae6]! py-2! px-6"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CancelInterviewModal;
