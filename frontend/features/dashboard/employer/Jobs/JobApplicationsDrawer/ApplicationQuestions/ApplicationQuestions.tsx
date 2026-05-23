import CustomButton from "@/shared/components/ui/CustomButton";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CurrentApplication } from "../types/applicantTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LuShieldAlert,
  LuCircleCheck,
  LuCircleX,
  LuUser,
} from "react-icons/lu";
import {
  getIsPassed,
  getKnockoutQuestions,
  getNonKnockoutQuestions,
  getPassedCount,
} from "../utils/screeningUtils";
import KnockoutQuestion from "./KnockoutQuestion";
import NonKnockoutQuestion from "./NonKnockoutQuestion";
import { useDispatch } from "react-redux";
import { setDeleteModal } from "../../JobList/JobListMenuSlice";

const ApplicationQuestions = ({
  applicant,
}: {
  applicant: CurrentApplication;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (!applicant) return null;

  const { fullname, lastWorkPlace, profilePhoto, title, screeningQuestions } =
    applicant;

  const knockoutQuestions = getKnockoutQuestions(screeningQuestions);
  const nonKnockoutQuestions = getNonKnockoutQuestions(screeningQuestions);
  const passedCount = getPassedCount(knockoutQuestions);
  const isPassed = getIsPassed(passedCount, knockoutQuestions);
  const failedCount = knockoutQuestions.length - passedCount;

  const handleCloseDrawer = (action: "back" | "close") => {
    const params = new URLSearchParams(window.location.search);
    params.delete("applicationId");
    params.delete("action");

    if (action === "close") {
      params.delete("jobId");
      dispatch(setDeleteModal({ jobId: null, open: false }));
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#f3f5f8] h-full w-full sm:max-w-md fixed right-0 shadow-2xl drop-shadow-2xl flex flex-col"
    >
      <div
        className={`px-4 py-3 ${knockoutQuestions.length === 0 ? "border-b border-b-border" : ""}`}
      >
        <div className="flex items-center justify-between mb-3">
          <CustomButton
            className="p-0! bg-transparent! flex items-center gap-1.5 text-muted-foreground! hover:text-black! font-medium text-sm"
            handleClick={() => handleCloseDrawer("back")}
          >
            <FiArrowLeft />
            Listeye Dön
          </CustomButton>

          <CustomButton
            className="p-0! bg-transparent! text-lg text-[#4B5157]! hover:text-black!"
            handleClick={() => handleCloseDrawer("close")}
          >
            <IoClose />
          </CustomButton>
        </div>

        <div className="flex items-center gap-3">
          {profilePhoto ? (
            <Image
              src={profilePhoto}
              alt={fullname}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="border border-border rounded-full w-10 h-10 text-gray-600 grid place-content-center">
              <LuUser size={22} />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1>
                <strong className="text-foreground font-semibold truncate">
                  {fullname}
                </strong>
              </h1>

              {!isPassed && (
                <span className="inline-flex items-center gap-1 truncate font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full text-[10px] px-1.5">
                  <LuCircleX size={12} /> Otomatik Red
                </span>
              )}
            </div>

            <p className="truncate text-sm text-muted-foreground">
              {title} {lastWorkPlace ? `@ ${lastWorkPlace}` : ""}
            </p>
          </div>
        </div>
      </div>

      {knockoutQuestions.length > 0 && (
        <div
          className={`py-3 px-5 border-y border-y-border flex justify-between ${isPassed ? "bg-emerald-50" : "bg-red-50"}`}
        >
          {isPassed ? (
            <div className="text-emerald-700 flex items-center gap-2">
              <LuCircleCheck />
              <span className="text-sm font-semibold">Eleme: Başarılı</span>
            </div>
          ) : (
            <div>
              <div className="text-red-700 flex items-center gap-2">
                <LuShieldAlert />
                <span className="text-sm font-semibold">Eleme: Başarısız</span>
              </div>

              <p className="mt-1.5 text-xs text-red-600/80">
                {failedCount} eleme sorusunda beklenen cevap verilemedi.
              </p>
            </div>
          )}

          <div>
            <span
              className={`text-sm font-medium tabular-nums ${isPassed ? "text-emerald-600" : "text-red-600"}`}
            >
              {passedCount}/{knockoutQuestions.length} doğru
            </span>
          </div>
        </div>
      )}

      <div className="visible-scrollbar">
        {knockoutQuestions.length > 0 && (
          <div className="p-4 flex flex-col space-y-3">
            {knockoutQuestions.map((q) => (
              <KnockoutQuestion key={q.question} question={q} />
            ))}
          </div>
        )}

        <div
          className={`${knockoutQuestions.length > 0 ? "p-4 pt-0" : "p-4"} flex flex-col space-y-3`}
        >
          {nonKnockoutQuestions.map((q) => (
            <NonKnockoutQuestion key={q.question} question={q} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationQuestions;
