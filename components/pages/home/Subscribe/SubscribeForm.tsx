"use client";

import { db } from "@/app/api/firebase/firebaseConfig";
import CustomButton from "@/components/ui/CustomButton";
import axios from "axios";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { FormEvent, useCallback, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "./notvalid-input.scss";

const SubscribeForm = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/;

      if (emailRegex.test(email)) {
        setIsSubmitting(true);
        const q = query(
          collection(db, "subscriptions"),
          where("email", "==", email),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        let isSubscribed = false;

        querySnapshot.forEach((doc) => {
          if (doc.data().email === email) isSubscribed = true;
        });

        if (!isSubscribed) {
          await axios.post(
            "/api/firebase/subscribe",
            JSON.stringify({ email: email })
          );

          const data = await emailjs.send(
            String(process.env.NEXT_PUBLIC_SERVICE_ID),
            String(process.env.NEXT_PUBLIC_TEMPLATE_ID),
            { user_email: email },
            {
              publicKey: String(process.env.NEXT_PUBLIC_PUBLIC_KEY),
            }
          );

          if (data.status === 200) {
            setIsSubmitting(false);
            setEmail("");
            toast.success("Abonelik başarılı!");
          } else {
            toast.error(
              "Üzgünüz, şu anda aboneliğinizi tamamlayamıyoruz. Lütfen daha sonra yeniden deneyin."
            );
          }
        } else {
          toast.error("Bu e-posta adresi ile abonelik mevcut.");
          setIsSubmitting(false);
        }
      }

      if (!emailRegex.test(email)) {
        if (formRef.current) {
          formRef.current.classList.add("subscribe-form");

          setTimeout(() => {
            formRef.current?.classList.remove("subscribe-form");
          }, 300);
        }
        return;
      }
    },
    [email]
  );

  return (
    <form
      className="flex flex-[1] items-center relative"
      ref={formRef}
      onSubmit={sendEmail}
      noValidate
    >
      <input
        type="email"
        placeholder="E-postanız"
        name="user_email"
        className="custom__input bg-white !py-6 !pe-40 !ps-5 !border-transparent shadow-2xl !text-[15px]"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        readOnly={isSubmitting}
      />

      <CustomButton
        isSubmitting={isSubmitting}
        text="Abone Ol"
        circularColor="white"
        className="!bg-[#202124] hover:!bg-[#202124e8] disabled:!bg-gray-400 px-8 !py-[12px] absolute right-3 w-[126.28px] whitespace-nowrap"
      />
    </form>
  );
};

export default SubscribeForm;
