import { nanoid } from "@reduxjs/toolkit";
import {
  ActivityItem,
  ActivityTime,
  Avatar,
  Badge,
  FullName,
  JobTitle,
} from "./Activity";
import { ActivityStatus } from "./types";

const activityList = [
  {
    _id: nanoid(),
    fullname: "Ömer Çıkan",
    jobTitle: "Full Stack Developer",
    status: "Başvurdu",
    createdAt: Date.now(),
  },
  {
    _id: nanoid(),
    fullname: "Ayşe Kaya",
    jobTitle: "UI/UX Designer",
    status: "Mülakat Planlandı",
    createdAt: Date.now() - 1000 * 60 * 15,
  },
  {
    _id: nanoid(),
    fullname: "Mehmet Yılmaz",
    jobTitle: "Backend Developer",
    status: "Reddedildi",
    createdAt: Date.now() - 1000 * 60 * 45,
  },
  {
    _id: nanoid(),
    fullname: "Zeynep Arslan",
    jobTitle: "Product Manager",
    status: "Kısa Listeye Alındı",
    createdAt: Date.now() - 1000 * 60 * 90,
  },
  {
    _id: nanoid(),
    fullname: "Can Demir",
    jobTitle: "DevOps Engineer",
    status: "Başvurdu",
    createdAt: Date.now() - 1000 * 60 * 120,
  },
  {
    _id: nanoid(),
    fullname: "Elif Şahin",
    jobTitle: "Data Analyst",
    status: "İncelendi",
    createdAt: Date.now() - 1000 * 60 * 180,
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-[#e2e5e8] col-span-2">
      <div className="max-[425px]:text-center">
        <h2 className="text-[#0f171f] font-semibold">Son Etkinlikler</h2>
        <p className="text-[#5b646f] text-sm mt-1">
          Başvuru sahipleriyle ilgili en son güncellemeler ve işlemler
        </p>
      </div>

      <div className="flex flex-col mt-8">
        {activityList.map((item) => (
          <div
            key={item._id}
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

              <ActivityTime time={item.createdAt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
