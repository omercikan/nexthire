import {
  ActivityItem,
  ActivityTime,
  Avatar,
  Badge,
  FullName,
  JobTitle,
} from "./Activity";
import { ActivityStatus } from "./types";

interface RecentActivityProps {
  fullname: string;
  jobTitle: string;
  status: string;
  updatedAt: Date;
}

const RecentActivity = ({
  activityList,
}: {
  activityList: RecentActivityProps[];
}) => {
  const hasActivity = activityList.length > 0;

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-[#e2e5e8] lg:col-span-2">
      <div className="max-[425px]:text-center">
        <h2 className="text-[#0f171f] font-semibold">Son Etkinlikler</h2>

        {hasActivity && (
          <p className="text-[#5b646f] text-sm mt-1">
            Başvuru sahipleriyle ilgili en son güncellemeler ve işlemler
          </p>
        )}
      </div>

      <div className="flex flex-col h-[calc(100%-48px)] mt-8">
        {activityList?.map((item, index) => (
          <div
            key={index}
            className="p-3 min-[425px]:rounded-xl transition-colors duration-300 max-[425px]:not-first:border-t border-gray-200 min-[425px]:hover:bg-[#F5F6F8]"
          >
            <div className="flex max-[425px]:items-center justify-between max-[425px]:flex-col w-full">
              <div className="flex max-[425px]:flex-col items-center gap-2">
                <Avatar fullname={item.fullname} />

                <ActivityItem>
                  <div className="flex max-[425px]:flex-col-reverse max-[425px]:items-center gap-2">
                    <FullName fullname={item.fullname} />
                    <Badge status={item.status as ActivityStatus} />
                  </div>

                  <JobTitle jobTitle={item.jobTitle} />
                </ActivityItem>
              </div>

              <ActivityTime time={item.updatedAt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
