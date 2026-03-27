"use client";

import { ChangeEvent, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/features/auth/authContext";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { setApplicationData } from "@/shared/redux/slices/applicationModal/modalData";
import CustomSelect from "@/shared/components/ui/CustomSelect";
import CustomInput from "@/shared/components/ui/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactInformationSchema } from "@/features/auth/schema/ContactInformationSchema";
import ModalFooter from "./ModalFooter";

const ModalContactInformation = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { applicationData } = useSelector(
    (state: RootState) => state.applicationModalData,
  );
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: user?.email ?? "",
      phone: applicationData.phone || user?.phoneNumber || "",
    },
    resolver: zodResolver(ContactInformationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(
      setApplicationData({ email: watch("email"), phone: watch("phone") }),
    );
  }, [dispatch, watch]);

  const handleChangeCapture = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>,
  ): void => {
    const { name, value } = e.currentTarget;

    dispatch(setApplicationData({ [name]: value }));
  };

  return (
    <div>
      <h3 className="text-[#000000E6] font-medium px-6 max-sm:px-3 max-sm:mt-4">
        İletişim bilgileri
      </h3>

      <div className="px-6 max-sm:px-3 py-2 flex flex-col gap-4">
        <CustomSelect
          label="E-posta adresi*"
          labelClass="mt-1 mb-0.5 text-[15px]"
          data={[
            {
              id: 1,
              name: "Bir seçenek belirleyin",
              disabled: true,
            },
            {
              id: 2,
              name: user?.email as string,
            },
          ]}
          isDefaultValueOption={false}
          isSubmitting={false}
          handleChangeCapture={handleChangeCapture}
          isFormatText={false}
          className="px-2! text-[15px]! py-1.5! mb-1 rounded-md!"
          {...register("email")}
        />

        <CustomInput
          type="tel"
          label="Cep telefon numarası*"
          labelClass="!mb-0.5 text-[#00000099] text-[15px]"
          className="px-2! py-1.5! none-spin-button text-[15px]! mb-1 rounded-md!"
          onChangeCapture={handleChangeCapture}
          {...register("phone")}
          placeholder={user?.phoneNumber ? "" : "Telefon numarası giriniz"}
          error={errors.phone?.message}
        />
      </div>

      <ModalFooter isValid={isValid} />
    </div>
  );
};

export default ModalContactInformation;
