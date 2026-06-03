import CustomButton from "@/shared/components/ui/CustomButton";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { CurrentApplication } from "../types/applicantTypes";
import Image from "next/image";
import { useEmployerJobsData } from "../../hooks/useEmployerJobsData";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuCalendar,
  LuUser,
  LuChevronDown,
  LuClock,
  LuLink2,
  LuMapPin,
} from "react-icons/lu";

import InterviewDateTimeScheduler from "./components/InterviewDateTimeScheduler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import {
  clearError,
  resetScheduler,
  setLocation,
  setMeetingLink,
} from "./interviewSchedulerSlice";
import FormField from "./components/FormField";
import TimeSlotPicker from "./components/TimeSlotPicker";
import InterviewTypePicker from "./components/InterviewTypePicker";
import CustomInput from "@/shared/components/ui/CustomInput";

const InterviewSchedulerDrawer = ({
  applicant,
}: {
  applicant: CurrentApplication;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { jobs } = useEmployerJobsData();

  const dispatch = useDispatch<AppDispatch>();
  const { scheduledAt, scheduledTime, type, meetingLink, location, errors } =
    useSelector((state: RootState) => state.interviewScheduler);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);

  const actionMode = searchParams.get("mode");
  const jobId = searchParams.get("jobId");

  // State cleanup function to close the drawer via URL
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("action");
    params.delete("applicationId");
    params.delete("mode");
    router.replace(`?${params.toString()}`, { scroll: false });
    dispatch(resetScheduler());
  };

  const currentJob = useMemo(() => {
    if (!jobId || !jobs) return null;
    return jobs.find((job) => job._id === jobId);
  }, [jobs, jobId]);

  const titleText =
    actionMode === "interview_edit" ? "Mülakatı Düzenle" : "Mülakat Planla";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/50"
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
      role="presentation"
    >
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
        onClick={(e) => {
          e.stopPropagation();
          if (isOpenCalendar) setIsOpenCalendar(false);
          if (isOpenTime) setIsOpenTime(false);
        }}
        className="fixed right-0 top-0 h-full w-full border-l border-l-border bg-white sm:max-w-100 flex flex-col"
        role="dialog"
        aria-label={titleText}
      >
        <div className="flex items-center justify-between border-b border-b-border py-4 px-5">
          <h2 className="text-base font-semibold text-foreground">
            {titleText}
          </h2>

          <CustomButton
            className="p-0! bg-transparent! text-lg text-[#4B5157]! hover:text-black!"
            aria-label="Kapat"
            handleClick={handleClose}
          >
            <IoCloseOutline />
          </CustomButton>
        </div>

        <div className="border-b border-b-border px-5 py-4">
          <ApplicantMetaCard applicant={applicant} />

          {currentJob && (
            <p className="mt-3 text-xs text-muted-foreground">
              Pozisyon:{" "}
              <span className="font-medium text-foreground">
                {currentJob.jobTitle}
              </span>
            </p>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-y-5 overflow-y-auto px-5 py-4">
          <FormField
            required
            label="Tarih"
            onClick={() => {
              setIsOpenCalendar((prev) => !prev);
              if (isOpenTime) setIsOpenTime(false);
            }}
            error={errors.scheduledAt}
            buttonContent={
              <>
                <LuCalendar size={16} color="4D5660" />
                {scheduledAt ? scheduledAt : "Tarih seçin"}
              </>
            }
          >
            <AnimatePresence>
              {isOpenCalendar && (
                <InterviewDateTimeScheduler setIsOpen={setIsOpenCalendar} />
              )}
            </AnimatePresence>
          </FormField>

          <FormField
            required
            label="Saat"
            onClick={() => {
              setIsOpenTime((prev) => !prev);
              if (isOpenCalendar) setIsOpenCalendar(false);
            }}
            error={errors.scheduledTime}
            buttonClassName="w-[150px]"
            buttonContent={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <LuClock size={16} color="4D5660" />
                  <span className={scheduledTime ? "text-foreground" : ""}>
                    {scheduledTime ? scheduledTime : "Saat seçin"}
                  </span>
                </div>

                <LuChevronDown size={16} color="4D5660" opacity={0.5} />
              </div>
            }
          >
            <AnimatePresence>
              {isOpenTime && <TimeSlotPicker setIsOpenTime={setIsOpenTime} />}
            </AnimatePresence>
          </FormField>

          <FormField required label="Mülakat Türü" error={errors.type}>
            <InterviewTypePicker />
          </FormField>

          <FormField
            required
            label={type === "online" ? "Toplantı Linki" : "Konum"}
            buttonClassName="w-[150px]"
          >
            <CustomInput
              placeholder={
                type === "online"
                  ? "https://meet.google.com/..."
                  : "Levent, İstanbul"
              }
              className="px-9! rounded-md! shadow-xs placeholder:text-muted-foreground text-foreground focus:outline-none focus:border-[#0073d5]! focus:ring-3 focus:ring-[#0073d5]/50"
              icon={type === "online" ? <LuLink2 /> : <LuMapPin />}
              value={(type === "online" ? meetingLink : location) ?? ""}
              error={type === "online" ? errors.meetingLink : errors.location}
              onChange={(e) => {
                const value = e.target.value;

                dispatch(
                  type === "online"
                    ? setMeetingLink(value)
                    : setLocation(value),
                );

                if (value) {
                  dispatch(
                    clearError(type === "online" ? "meetingLink" : "location"),
                  );
                }
              }}
              iconSpanClass="text-muted-foreground!"
            />
          </FormField>
        </div>
      </motion.aside>
    </motion.div>
  );
};

const ApplicantMetaCard = ({
  applicant,
}: {
  applicant: CurrentApplication;
}) => {
  const { fullname, title, profilePhoto, lastWorkPlace } = applicant;

  return (
    <div className="flex items-center gap-3">
      {profilePhoto ? (
        <Image
          src={profilePhoto}
          alt={`${fullname} profil fotoğrafı`}
          width={40}
          height={40}
          className="rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="grid h-10 w-10 shrink-0 place-content-center rounded-full border border-border text-gray-600">
          <LuUser size={22} />
        </div>
      )}

      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium text-foreground">
          {fullname}
        </h3>
        <p className="truncate text-xs text-muted-foreground">
          {title} {lastWorkPlace ? `@ ${lastWorkPlace}` : ""}
        </p>
      </div>
    </div>
  );
};

export default InterviewSchedulerDrawer;
