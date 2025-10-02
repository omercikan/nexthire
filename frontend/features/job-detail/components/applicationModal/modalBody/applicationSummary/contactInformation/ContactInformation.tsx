import React from "react";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";
import SummaryContent from "../SummaryContent";
import { RootState } from "@/shared/redux/store";

const ContactInformation = () => {
  const { email, phone } = useSelector(
    (state: RootState) => state.applicationModalData.applicationData
  );

  return (
    <SummaryContent contentTitle="İletişim bilgileri" step={1}>
      <ContactItem
        items={[
          {
            label: "E-posta adresi",
            text: email,
          },
          {
            label: " Cep telefonu numarası*",
            text: phone,
          },
        ]}
      />
    </SummaryContent>
  );
};

export default ContactInformation;
