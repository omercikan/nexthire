import { stepCards } from "@/data/stepCards";
import Image from "next/image";
import React from "react";

const StepCards = () => {
  return (
    <section>
      <div className="container py-[100px] max-lg:py-[30px]">
        <div className="text-center text-[#202124]">
          <h1 className="text-3xl max-lg:text-[25px] font-medium">
            İşletme Yönetiminin Altın Kuralları
          </h1>
          <p className="text-[15px] mt-2">
            Az çaba, çok sonuç: İşinizi büyütmek için odaklanmanız gerekenler.
          </p>
        </div>

        <ul className="flex max-md:flex-col justify-evenly items-center mt-[25px]">
          {stepCards.map((card) => (
            <li key={card.id} className="text-center p-[15px]">
              <Image
                src={card.cardImage}
                alt={card.cardTitle}
                width={200}
                height={182}
                className="mx-auto !w-[200px] !h-[182px] object-cover"
              />
              <h2 className="text-[#202124] text-[20px] font-medium my-[15px]">
                {card.cardTitle}
              </h2>
              <p className="text-[#202124]">{card.cardDescription}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StepCards;
