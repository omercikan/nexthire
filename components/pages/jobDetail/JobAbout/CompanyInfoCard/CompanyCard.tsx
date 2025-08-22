import { routeFormatter } from "@/lib/routeFormat";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import CardList from "./CardList";
import { CompanyInformations, Socials } from "./card.types";
import { SOCIALS } from "./socialIcons";
import { exractUrl, mailUrl } from "@/lib/utils/extractUrl";

const renderSocialIcon = (url: string, index: number): ReactElement => {
  const { platformName, customUrl } = exractUrl(url);
  const mail = mailUrl(url);

  const Icon = SOCIALS[platformName as Socials];
  const MailIcon = SOCIALS[mail as Socials];
  const href = `https://${platformName}.com${url.split(".com").at(-1)}`;

  return (
    <Link
      key={index}
      href={customUrl ?? href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#696969] hover:text-[#bc91e8] transition-colors duration-500 text-[15px]"
    >
      {(Icon && <Icon />) || (MailIcon && <MailIcon />)}
    </Link>
  );
};

const CompanyCard = ({ companyInformations }: CompanyInformations) => {
  const {
    category,
    companyId,
    companyLogo,
    companyName,
    email,
    foundedDate,
    location,
    phoneNumber,
    socials,
    websiteUrl,
  } = companyInformations;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handleShowPhone = () => setShowPhoneNumber(true);

  return (
    <div className="mt-[30px] bg-[#f5f7fc] p-[30px] max-[992px]:p-5 rounded-lg w-full">
      <div className="flex gap-5">
        {companyLogo && (
          <Image
            src={companyLogo}
            alt={companyName}
            width={80}
            height={80}
            className="rounded-lg"
          />
        )}

        <div>
          <Link
            href={`/firma-profil/${routeFormatter(companyName)}-${companyId}`}
          >
            <strong className="text-lg font-medium text-[#202124] hover:text-[#1967d2] transition-colors duration-300">
              {companyName}
            </strong>
          </Link>

          <Link
            href={`/firma-profil/${routeFormatter(companyName)}-${companyId}`}
            className="text-[#1967d2] text-sm hover:underline block mt-2.5"
          >
            Şirket Profiline Git
          </Link>
        </div>
      </div>

      <CardList
        items={[
          { id: 1, title: "Kategori", text: `${category}` },
          { id: 2, title: "Kuruluş Tarihi", text: `${foundedDate}` },
          { id: 3, title: "Konum", text: `${location}` },
          {
            id: 4,
            title: "Telefon Numarası",
            element: (
              <div className="flex gap-2 items-center">
                {showPhoneNumber ? (
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="text-[#696969] text-[15px] hover:underline hover:text-[#1967d2] transition-all duration-500"
                  >
                    {phoneNumber}
                  </Link>
                ) : (
                  <span
                    className="text-[#696969] text-[15px] cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
                    onClick={handleShowPhone}
                  >
                    {phoneNumber.slice(0, 11)} ** **
                  </span>
                )}

                {!showPhoneNumber && (
                  <span
                    className="bg-[#1967d2] text-white text-[11px] py-[3px] px-2.5 rounded-sm cursor-pointer"
                    onClick={handleShowPhone}
                  >
                    Göster
                  </span>
                )}
              </div>
            ),
          },
          {
            id: 5,
            title: "Email",
            element: (
              <Link
                href={`mailto:${email}`}
                className="text-[#696969] hover:text-[#1967d2] transition-colors duration-500 text-[15px] hover:underline"
              >
                {email}
              </Link>
            ),
          },
        ]}
      />

      {socials && (
        <ul className="flex items-center justify-between gap-[15px] mt-5">
          <h3 className="text-[#202124] font-medium">Sosyal Platformlar:</h3>

          <div className="flex gap-[15px]">
            {socials?.map((val, i) => renderSocialIcon(val?.url, i))}
          </div>
        </ul>
      )}

      {websiteUrl && (
        <Link
          href={`https://www.${exractUrl(websiteUrl).platformName}.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-[13.5px] px-[30px] mt-5 text-center text-[15px] text-[#1967d2] hover:text-white bg-[#E6EDF9] hover:bg-[#1967d2] transition-colors duration-300 rounded-lg block"
        >
          {exractUrl(websiteUrl).platformName + ".com"}
        </Link>
      )}
    </div>
  );
};

export default CompanyCard;
