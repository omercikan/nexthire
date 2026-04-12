import { formatApplyTime } from "@/shared/utils/formatApplyTime";
import { ActivityStatus } from "./types";

function Avatar({ fullname }: { fullname: string }) {
  const splitName = fullname.split(" ");

  return (
    <div className="bg-[#E6F1FB] text-[#0073d5] font-semibold text-sm w-10 h-10 rounded-full grid place-content-center">
      {splitName[0].charAt(0)}
      {splitName[1].charAt(0)}
    </div>
  );
}

function FullName({ fullname }: { fullname: string }) {
  return (
    <strong className="font-medium text-sm text-[#0f171f] whitespace-nowrap text-ellipsis overflow-hidden">{fullname}</strong>
  );
}

function Badge({ status }: { status: ActivityStatus }) {
  const statusStyles: Record<ActivityStatus, string> = {
    "Başvurdu": "bg-blue-500/10 text-blue-400",
    "İncelendi": "bg-yellow-500/10 text-yellow-400",
    "Kısa Listeye Alındı": "bg-purple-500/10 text-purple-400",
    "Mülakat Planlandı": "bg-orange-500/10 text-orange-400",
    "Mülakat Yapıldı": "bg-cyan-500/10 text-cyan-400",
    "İşe Alındı": "bg-green-500/10 text-green-400",
    "Reddedildi": "bg-red-500/10 text-red-400",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full font-medium text-xs whitespace-nowrap text-ellipsis overflow-hidden w-max ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function JobTitle({ jobTitle }: { jobTitle: string }) {
  return <p className="text-[#5b646f] text-sm">{jobTitle}</p>;
}

function ActivityItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function ActivityTime({ time }: { time: number }) {
  return (
    <div>
      <span className="text-[#5b646f] text-xs whitespace-nowrap text-ellipsis overflow-hidden">{formatApplyTime(time)}</span>
    </div>
  );
}

export { Avatar, FullName, ActivityItem, Badge, JobTitle, ActivityTime };
