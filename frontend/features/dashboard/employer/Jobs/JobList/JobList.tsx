import { cn } from "@/shared/libs/utils";
import JobIListItem from "./JobListItem";
import NoneJobContent from "./NoneJobContent";

const mockJobs = [
  {
    _id: "1",
    jobTitle: "Kıdemli Frontend Geliştirici",
    department: "Yazılım Geliştirme",
    location: "İstanbul, Türkiye",
    workType: "uzaktan",
    category: "Yazılım & Bilişim",
    applicants: 47,
    createdAt: new Date("2026-04-10T09:23:11"),
    status: "published",
  },
  {
    _id: "2",
    jobTitle: "Ürün Müdürü",
    department: "Dijital Medya",
    location: "Ankara, Türkiye",
    workType: "hibrit",
    category: "Yönetim",
    applicants: 31,
    createdAt: new Date("2026-04-08T14:05:47"),
    status: "published",
  },
  {
    _id: "3",
    jobTitle: "Backend Geliştirici (Node.js)",
    department: "Yazılım Geliştirme",
    location: "İzmir, Türkiye",
    workType: "Uzaktan",
    category: "Yazılım & Bilişim",
    applicants: 52,
    createdAt: new Date("2026-04-05T11:41:30"),
    status: "published",
  },
  {
    _id: "4",
    jobTitle: "İnsan Kaynakları Uzmanı",
    department: "İnsan Kaynakları",
    location: "İstanbul, Türkiye",
    workType: "Tam Zamanlı",
    category: "İnsan Kaynakları",
    applicants: 23,
    createdAt: new Date("2026-03-28T08:17:55"),
    status: "passive",
  },
  {
    _id: "5",
    jobTitle: "Pazarlama Stajyeri",
    department: "Pazarlama",
    location: "İstanbul, Türkiye",
    workType: "Yarı Zamanlı",
    category: "Pazarlama",
    applicants: 89,
    createdAt: new Date("2026-04-12T16:33:22"),
    status: "published",
  },
  {
    _id: "6",
    jobTitle: "Veri Analisti Stajyeri",
    department: "Veri Bilimi",
    location: "İstanbul, Türkiye",
    workType: "hibrit",
    category: "Yazılım & Bilişim",
    applicants: 0,
    createdAt: new Date("2026-04-12T10:58:04"),
    status: "draft",
  },
  {
    _id: "7",
    jobTitle: "DevOps Mühendisi",
    department: "Altyapı",
    location: "Uzaktan",
    workType: "uzaktan",
    category: "Yazılım & Bilişim",
    applicants: 0,
    createdAt: new Date("2026-04-01T13:22:39"),
    status: "draft",
  },
  {
    _id: "8",
    jobTitle: "Grafik Tasarımcı",
    department: "Tasarım",
    location: "Bursa, Türkiye",
    workType: "Yarı Zamanlı",
    category: "Tasarım",
    applicants: 14,
    createdAt: new Date("2026-04-07T07:44:18"),
    status: "passive",
  },
];

const JobList = () => {
  return (
    <div className="mt-6">
      <div>
        <p className="text-muted-foreground text-sm">
          {mockJobs.length} sonuç gösteriliyor
        </p>
      </div>

      <div
        className={cn(
          "mt-4 grid gap-4",
          mockJobs.length ? "md:grid-cols-2" : "grid-cols-1",
        )}
      >
        {mockJobs.length ? (
          mockJobs.map((job) => <JobIListItem key={job._id} job={job} />)
        ) : (
          <NoneJobContent />
        )}
      </div>
    </div>
  );
};

export default JobList;
