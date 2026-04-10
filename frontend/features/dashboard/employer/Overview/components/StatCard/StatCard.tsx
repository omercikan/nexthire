import { statIcons } from "../../icons/statIcons";
import StatCardItem from "./StatCardItem";

const cards = [
  {
    icon: statIcons.BriefCase,
    dataText: "24",
    dataDescription: "Toplam İş İlanı Sayısı",
    dataSubDescription: "geçen aydan",
  },
  {
    icon: statIcons.FileText,
    dataText: "12",
    dataDescription: "Aktif İlanlar",
    dataSubDescription: "şu anda yayında",
  },
  {
    icon: statIcons.Users,
    dataText: "486",
    dataDescription: "Toplam Başvuru Sayısı",
    dataSubDescription: "tüm zamanlar",
  },
  {
    icon: statIcons.UserPlus,
    dataText: "48",
    dataDescription: "Yeni Başvuru Sahipleri",
    dataSubDescription: "son 7 gün",
  },
  {
    icon: statIcons.Calendar,
    dataText: "7",
    dataDescription: "Planlanan Röportajlar",
    dataSubDescription: "bu hafta",
  },
];

const StatCard = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {cards.map((card, i) => (
        <StatCardItem
          key={i}
          icon={card.icon}
          dataText={card.dataText}
          dataDescription={card.dataDescription}
          dataSubDescription={card.dataSubDescription}
        />
      ))}
    </div>
  );
};

export default StatCard;
