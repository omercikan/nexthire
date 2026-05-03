import CustomButton from "@/shared/components/ui/CustomButton";
import { AiOutlineWarning } from "react-icons/ai";
import { PiBagSimpleBold } from "react-icons/pi";
import { LuTrash2 } from "react-icons/lu";

import useJobModal from "./useJobModal";
import { motion } from "framer-motion";

const DeleteJobModal = () => {
  const { job, handleClose } = useJobModal();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="backdrop-blur-xs w-full h-full fixed top-0 left-0 z-1002 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 rounded-2xl bg-white w-full max-w-md max-sm:w-[95%] shadow-2xl drop-shadow-2xl border border-gray-300 flex flex-col gap-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#FEF2F2] grid place-content-center mx-auto">
          <AiOutlineWarning color="BA1A1A" size={32} />
        </div>

        <div>
          <h2 className="text-[#151c27] text-xl font-semibold text-center">
            İlanı Sil
          </h2>

          <p className="text-[#46474a] text-center mt-2">
            Bu işlem kalıcıdır ve bu ilana yapılan tüm başvurular da
            silinecektir. Devam etmek istediğinizden emin misiniz?
          </p>
        </div>

        <div className="bg-[#f0f3ff] rounded-xl p-4 flex items-center gap-4 border border-[#c7c6ca33]">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <PiBagSimpleBold color="46474a" size={21} />
          </div>

          <div className="flex flex-col">
            <span className="text-[#151c27] text-sm font-semibold text-label-md">
              {job?.jobTitle}
            </span>
            <span className="text-[#46474a] text-xs font-medium text-label-md">
              {job?.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <CustomButton
            text="Vazgeç"
            className="flex-1 bg-transparent! text-[#151c27]!  px-6! py-3! rounded-2xl! text-[14px] font-medium border border-[#c7c6ca] hover:bg-[#f0f3ff]!"
            handleClick={handleClose}
          />

          <CustomButton className="flex-1 px-6! py-3! rounded-2xl! text-[14px] font-medium text-white bg-[#E02424]! hover:bg-[#C81E1E]! transition-colors duration-200 flex items-center justify-center gap-2">
            <LuTrash2 />
            Evet, Sil
          </CustomButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteJobModal;
