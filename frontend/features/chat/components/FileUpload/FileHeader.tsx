import CustomButton from "@/shared/components/ui/CustomButton";
import { AppDispatch } from "@/shared/redux/store";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateOption } from "../OptionsMenu/slice/optionMenuSlice";

const FileHeader = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-[#0B0B0B] text-lg font-semibold">Dosya Yükle</h1>
        <p className="text-[#6D6D6D] text-[15px]">
          Özgeçmişinizi buraya ekleyin.
        </p>
      </div>

      <CustomButton className="bg-transparent! p-0!" handleClick={() => dispatch(updateOption("cv analiz modunu kapat"))}>
        <IoClose color="0B0B0B" size={22} />
      </CustomButton>
    </div>
  );
};

export default FileHeader;
