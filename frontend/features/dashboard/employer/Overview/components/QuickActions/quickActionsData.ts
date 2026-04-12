import { quickActionIcons } from "../../icons/quickActions";

export const actionButtonsMap = [
  {
    title: "Yeni İş İlanı Yayınla",
    description: "Yeni bir iş ilanı oluşturun ve yayınlayın",
    icon: quickActionIcons.Plus,
    route: "/hesabim/is-paylas",
  },
  {
    title: "Başvuru Sahiplerini Görüntüle",
    description: "Tüm adayları inceleyin ve yönetin",
    icon: quickActionIcons.Users,
    route: "/hesabim/aday-basvurulari",
  },
  {
    title: "İlanları Yönet",
    description: "Etkin iş ilanlarınızı düzenleyin veya güncelleyin",
    icon: quickActionIcons.FileText,
    route: "/hesabim/islerim",
  },
];
