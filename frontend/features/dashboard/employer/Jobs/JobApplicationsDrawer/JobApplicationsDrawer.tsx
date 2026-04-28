import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DrawerSearch from "./DrawerSearch";
import DrawerHeader from "./DrawerHeader";
import DrawerStatusFilter from "./DrawerStatusFilter";
import Image from "next/image";
import { formatApplyTime } from "@/shared/utils/formatApplyTime";
import { Applicant } from "./types/applicantTypes";
import {
  LuClipboardList,
  LuFileText,
  LuStar,
  LuCalendar,
} from "react-icons/lu";
import { GoXCircle } from "react-icons/go";
import ApplicationActionButton from "./ApplicationActionButton";
import ApplicationStatus from "./ApplicationStatus";

function DrawerWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#f3f5f8] h-full w-full sm:max-w-md fixed right-0 shadow-2xl drop-shadow-2xl flex flex-col"
    >
      {children}
    </motion.div>
  );
}

const applicantsData: Applicant[] = [
  {
    candidateId: "c1",
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    fullname: "Ömer Çıkan",
    title: "Full Stack Developer",
    lastWorkPlace: "NextHire",
    experienceTime: "7",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    resume: {
      url: "cv1.pdf",
      originalName: "omer_cv.pdf",
      fileName: "cv_123",
      size: 1024,
    },
    phone: "0555 555 55 55",
    email: "omercikan@gmail.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "3",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
      { question: "Ehliyetiniz var mı?", answer: "evet", knockout: false },
    ],
    status: [{ value: "pending", changedAt: new Date() }],
  },
  {
    candidateId: "c2",
    profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
    fullname: "Zeynep Aydın",
    title: "Senior Frontend Engineer",
    lastWorkPlace: "Trendyol",
    experienceTime: "5",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    resume: {
      url: "cv2.pdf",
      originalName: "zeynep_aydin_cv.pdf",
      fileName: "cv_456",
      size: 2048,
    },
    phone: "0532 111 22 33",
    email: "zeynep.aydin@email.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "5",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
    ],
    status: [
      {
        value: "pending",
        changedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        value: "reviewed",
        changedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      },
      { value: "shortlisted", changedAt: new Date() },
    ],
  },
  {
    candidateId: "c3",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    fullname: "Can Demir",
    title: "Backend Developer",
    lastWorkPlace: "Getir",
    experienceTime: "2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    resume: {
      url: "cv3.pdf",
      originalName: "can_demir_cv.pdf",
      fileName: "cv_789",
      size: 1500,
    },
    phone: "0544 333 44 55",
    email: "can.demir@email.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "1",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
    ],
    status: [{ value: "auto_rejected", changedAt: new Date() }],
  },
  {
    candidateId: "c4",
    profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg",
    fullname: "Merve Kaya",
    title: "UI/UX Designer",
    lastWorkPlace: "Hepsiburada",
    experienceTime: "4",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    resume: {
      url: "cv4.pdf",
      originalName: "merve_kaya_portfolio.pdf",
      fileName: "cv_012",
      size: 5000,
    },
    phone: "0505 555 66 77",
    email: "merve.kaya@email.com",
    screeningQuestions: [
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
    ],
    status: [
      {
        value: "pending",
        changedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
      {
        value: "reviewed",
        changedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      { value: "scheduled", changedAt: new Date() },
    ],
  },
  {
    candidateId: "c5",
    profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg",
    fullname: "Bora Aras",
    title: "Junior Node.js Developer",
    lastWorkPlace: "Freelance",
    experienceTime: "1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    resume: {
      url: "cv5.pdf",
      originalName: "bora_aras_cv.pdf",
      fileName: "cv_345",
      size: 1200,
    },
    phone: "0533 777 88 99",
    email: "bora.aras@email.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "0",
        knockout: true,
        knockoutAnswer: "2",
      },
    ],
    status: [
      {
        value: "pending",
        changedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
      },
      { value: "rejected", changedAt: new Date() },
    ],
  },
  {
    candidateId: "c6",
    profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
    fullname: "Ayşe Kara",
    title: "Frontend Developer",
    lastWorkPlace: "Trendyol",
    experienceTime: "4",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    resume: {
      url: "cv6.pdf",
      originalName: "ayse_cv.pdf",
      fileName: "cv_124",
      size: 2048,
    },
    phone: "0532 111 22 33",
    email: "ayse.kara@gmail.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "4",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
      { question: "Ehliyetiniz var mı?", answer: "hayır", knockout: false },
    ],
    status: [{ value: "shortlisted", changedAt: new Date() }],
  },
  {
    candidateId: "c7",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    fullname: "Burak Demir",
    title: "Backend Developer",
    lastWorkPlace: "Getir",
    experienceTime: "6",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    resume: {
      url: "cv7.pdf",
      originalName: "burak_cv.pdf",
      fileName: "cv_125",
      size: 3072,
    },
    phone: "0544 222 33 44",
    email: "burak.demir@gmail.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "1",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "hayır",
        knockout: true,
        knockoutAnswer: "evet",
      },
      { question: "Ehliyetiniz var mı?", answer: "evet", knockout: false },
    ],
    status: [{ value: "rejected", changedAt: new Date() }],
  },
  {
    candidateId: "c8",
    profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg",
    fullname: "Selin Yıldız",
    title: "UI/UX Designer",
    lastWorkPlace: "Hepsiburada",
    experienceTime: "3",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    resume: {
      url: "cv8.pdf",
      originalName: "selin_cv.pdf",
      fileName: "cv_126",
      size: 1536,
    },
    phone: "0555 333 44 55",
    email: "selin.yildiz@gmail.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "2",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
      { question: "Ehliyetiniz var mı?", answer: "evet", knockout: false },
    ],
    status: [{ value: "scheduled", changedAt: new Date() }],
  },
  {
    candidateId: "c9",
    profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg",
    fullname: "Emre Şahin",
    title: "DevOps Engineer",
    lastWorkPlace: "Yemeksepeti",
    experienceTime: "5",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    resume: {
      url: "cv9.pdf",
      originalName: "emre_cv.pdf",
      fileName: "cv_127",
      size: 4096,
    },
    phone: "0533 444 55 66",
    email: "emre.sahin@gmail.com",
    screeningQuestions: [
      {
        question: "Kaç yıl react deneyiminiz var?",
        answer: "3",
        knockout: true,
        knockoutAnswer: "2",
      },
      {
        question: "Bu ilanın olduğu konuma gidip gelebilir misiniz?",
        answer: "evet",
        knockout: true,
        knockoutAnswer: "evet",
      },
      { question: "Ehliyetiniz var mı?", answer: "hayır", knockout: false },
    ],
    status: [{ value: "pending", changedAt: new Date() }],
  },
  {
    candidateId: "c10",
    profilePhoto: "https://randomuser.me/api/portraits/women/6.jpg",
    fullname: "Merve Aksoy",
    title: "Mobile Developer",
    lastWorkPlace: "Turkcell",
    experienceTime: "2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100),
    resume: {
      url: "cv10.pdf",
      originalName: "merve_cv.pdf",
      fileName: "cv_128",
      size: 2560,
    },
    phone: "0542 555 66 77",
    email: "merve.aksoy@gmail.com",
    screeningQuestions: [],
    status: [{ value: "auto_rejected", changedAt: new Date() }],
  },
];

const JobApplicationsDrawer = ({
  jobId,
  open,
}: {
  jobId: string;
  open: boolean;
}) => {
  const router = useRouter();

  const handleCloseDrawer = () => {
    router.replace("/hesabim/islerim", { scroll: false });
    document.body.style.overflow = "visible";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed right-0 top-0 bg-black/50 h-full w-full z-50 text-white"
          onClick={handleCloseDrawer}
        >
          <DrawerWrapper>
            <DrawerHeader handleCloseDrawer={handleCloseDrawer} />

            <div className="px-5 py-4 border-b border-b-border">
              <DrawerSearch />
              <DrawerStatusFilter />
            </div>

            <div className="p-2 flex-1 visible-scrollbar">
              {applicantsData?.map((item) => {
                return (
                  <div
                    key={item.candidateId}
                    className="p-3 flex gap-3 border border-transparent hover:border-border rounded-[10px] transition-colors min-w-0"
                  >
                    <Image
                      src={item.profilePhoto}
                      alt={item.fullname}
                      width={36}
                      height={36}
                      className="rounded-full self-start shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-foreground font-medium text-sm truncate">
                          {item.fullname}
                        </strong>

                        <ApplicationStatus
                          createdAt={item.createdAt}
                          status={item.status}
                        />
                      </div>

                      <p className="text-muted-foreground text-xs truncate">
                        {item.title}{" "}
                        {item.lastWorkPlace ? `@ ${item.lastWorkPlace}` : null}
                      </p>

                      <div className="text-muted-foreground text-[11px] mt-1 flex items-center gap-2">
                        <span className="shrink-0">
                          {item.experienceTime} yıl deneyim
                        </span>
                        <span className="text-border shrink-0">•</span>
                        <span className="shrink-0">
                          {formatApplyTime(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex ms-auto gap-4 shrink-0">
                      {!!item.screeningQuestions.length && (
                        <ApplicationActionButton
                          icon={LuClipboardList}
                          tooltip="Cevapları Gör"
                          className="hover:text-[#0073d5]!"
                        />
                      )}

                      <ApplicationActionButton
                        icon={LuFileText}
                        tooltip="CV Görüntüle"
                        className="hover:text-[#0073d5]!"
                        onClick={() => window.open(item.resume.url)}
                      />

                      <ApplicationActionButton
                        icon={LuStar}
                        tooltip="Kısa Listeye Al"
                        className="hover:text-[#009966]!"
                      />

                      <ApplicationActionButton
                        icon={LuCalendar}
                        tooltip="Mülakata Al"
                        className="hover:text-[#4f39f6]!"
                      />

                      <ApplicationActionButton
                        icon={GoXCircle}
                        tooltip="Reddet"
                        className="hover:text-[#fb2c36]!"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </DrawerWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationsDrawer;
