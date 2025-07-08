"use client";

import { ContactInformationSchema } from "@/app/(auth)/schema/ApplicationModal/ContactInformationSchema";
import CustomInput from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import { AuthContext } from "@/context/authContext";
import { Form, Formik } from "formik";
import React, { ChangeEvent, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { setApplicationData } from "@/lib/redux/features/applicationModal/modalData";
import InformationMessage from "../modalUI/InformationMessage";
import ModalControls from "../modalControls/ModalControls";

const ModalContactInformation = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { applicationData } = useSelector(
    (state: RootState) => state.applicationModalData
  );

  const handleChangeCapture = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ): void => {
    const { name, value } = e.currentTarget;

    dispatch(
      setApplicationData({
        ...applicationData,
        [name]: value,
        email: user?.email,
      })
    );
  };

  return (
    <div className="">
      <h3 className="text-[#000000E6] font-medium px-6">İletişim bilgileri</h3>

      <Formik
        enableReinitialize
        initialValues={{
          email: user?.email || "",
          phone: user?.phoneNumber || applicationData.phone || "",
        }}
        onSubmit={() => {}}
        validationSchema={ContactInformationSchema}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            <div className="px-6 py-2 flex flex-col gap-4">
              <CustomSelect
                name="email"
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
                value={values?.email}
                handleChange={handleChange}
                handleChangeCapture={handleChangeCapture}
                isFormatText={false}
                className="!px-2 !text-[15px] !py-1.5 mb-1 !rounded-md"
              />

              <CustomInput
                type="tel"
                label="Cep telefon numarası*"
                labelClass="!mb-0.5 text-[#00000099] text-[15px]"
                name="phone"
                className="!px-2 !py-1.5 none-spin-button !text-[15px] mb-1 !rounded-md"
                onChange={handleChange}
                onChangeCapture={handleChangeCapture}
                placeholder={
                  user?.phoneNumber ? "" : "Telefon numarası giriniz"
                }
                value={values?.phone}
              />
            </div>

            <InformationMessage />
            <ModalControls isErrors={Object.keys(errors)} formValues={values} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModalContactInformation;
