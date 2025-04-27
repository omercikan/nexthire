import { PiPencilCircleFill } from "react-icons/pi";
import { MdEngineering } from "react-icons/md";
import { GiAcousticMegaphone } from "react-icons/gi";
import { IoCreateOutline } from "react-icons/io5";
import { BsFileEarmarkCode } from "react-icons/bs";
import { CiDatabase } from "react-icons/ci";

export const categories = [
  {
    id: 1,
    name: "Yazılım Geliştirme",
    icon: BsFileEarmarkCode,
  },
  {
    id: 2,
    name: "Grafik Tasarım",
    icon: PiPencilCircleFill,
  },
  {
    id: 3,
    name: "Veri Bilimi",
    icon: CiDatabase,
  },
  {
    id: 4,
    name: "Dijital Pazarlama",
    icon: GiAcousticMegaphone,
  },
  {
    id: 5,
    name: "Mühendislik",
    icon: MdEngineering,
  },
  {
    id: 6,
    name: "İçerik Üretimi",
    icon: IoCreateOutline,
  },
];
