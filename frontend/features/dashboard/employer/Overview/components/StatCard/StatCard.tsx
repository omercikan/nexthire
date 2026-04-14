import { statIcons } from "../../icons/statIcons";
import { Stats } from "../../types/api-response";
import StatCardItem from "./StatCardItem";

interface StatCardProps {
  stats: Stats;
  isLoading: boolean;
}

const StatCard = ({ stats, isLoading }: StatCardProps) => {
  const cards = [
    {
      icon: statIcons.BriefCase,
      dataText: stats?.totalJobs,
      delta: stats?.totalJobsDelta,
      dataDescription: "Toplam İş İlanı Sayısı",
      dataSubDescription: "geçen aydan",
    },
    {
      icon: statIcons.FileText,
      dataText: stats?.activeJobs,
      delta: stats?.activeListingsDelta,
      dataDescription: "Aktif İlanlar",
      dataSubDescription: "şu anda yayında",
    },
    {
      icon: statIcons.Users,
      dataText: stats?.totalApplications,
      delta: stats?.thisMonthApplications,
      dataDescription: "Toplam Başvuru Sayısı",
      dataSubDescription: "tüm zamanlar",
    },
    {
      icon: statIcons.UserPlus,
      dataText: stats?.newApplicants,
      delta: stats?.newApplicantsDelta,
      dataDescription: "Yeni Başvuru Sahipleri",
      dataSubDescription: "son 7 gün",
    },
    {
      icon: statIcons.Calendar,
      dataText: stats?.scheduledInterviews,
      delta: stats?.scheduledInterviewsDelta,
      dataDescription: "Planlanan Röportajlar",
      dataSubDescription: "bu hafta",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {cards.map((card, i) => (
        <StatCardItem
          key={i}
          icon={card.icon}
          dataText={String(card.dataText)}
          delta={card.delta}
          isPositiveDelta={card.delta >= 0}
          dataDescription={card.dataDescription}
          dataSubDescription={card.dataSubDescription}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default StatCard;
