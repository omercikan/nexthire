// lib/seo.ts
import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "NextHire | Doğru İş, Doğru Aday",
  description:
    "NextHire, iş arayanlar ve işverenler için doğru iş ve doğru adayları bulma platformudur. En iyi kariyer fırsatları ve adaylarla hızlıca tanışın.",
  keywords:
    "NextHire, iş ilanları, kariyer fırsatları, iş bulma, adaylar, işverenler, iş başvurusu, iş arama platformu, iş ve kariyer",
  openGraph: {
    title: "NextHire | Doğru İş, Doğru Aday",
    description:
      "NextHire ile doğru iş fırsatlarına hızlıca ulaşın ve kariyerinizi geliştirin.",
    // url: "https://nexthire.com", //! After the project is completed and deployed
    siteName: "NextHire",
    images: [
      {
        url: "https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png",
        width: 1200,
        height: 630,
        alt: "NextHire Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextHire | Doğru İş, Doğru Aday",
    description:
      "Kariyer fırsatlarınızı keşfedin. NextHire ile iş başvurularınızı hızlıca yapın.",
    images: [
      "https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png",
    ],
    creator: "@nexthire",
  },
  robots: {
    index: true,
    follow: true,
  },
  //   metadataBase: new URL("https://nexthire.com"), //! After the project is completed and deployed
  alternates: {
    canonical: "/",
  },
};
