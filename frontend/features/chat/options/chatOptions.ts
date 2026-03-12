import { OptionMenuState } from "../components/OptionsMenu/slice/optionMenuSlice";
import { ChatIcons } from "../icons/ChatIcon";

const { newChat, cv, history, screen } = ChatIcons;

export const chatOptions = ({ isFullScreen, isCvAnalyze }: OptionMenuState) => [
  {
    icon: newChat,
    name: "Yeni Sohbet Başlat",
  },

  {
    icon: cv,
    name: isCvAnalyze ? "CV Analiz Modunu Kapat" : "CV Analiz Modunu Aç",
  },

  {
    icon: history,
    name: "Sohbet Geçmişini Temizle",
  },

  {
    icon: screen,
    name: isFullScreen ? "Tam Ekran'dan Çık" : "Tam Ekran Yap",
  },
];
