import { cn } from "@/shared/libs/utils";
import dayjs from "dayjs";
import { IconType } from "react-icons/lib";
import { LuBuilding2, LuMapPin, LuUsers, LuCalendar } from "react-icons/lu";
import { statusMap, workTypeMap } from "./jobListingMaps";
import JobListItemMenu from "./JobListItemMenu";

interface JobIListItemProps {
  _id: string;
  jobTitle: string;
  department: string;
  location: string;
  workType: string;
  category: string;
  applicants: number;
  createdAt: Date;
  status: "draft" | "published" | "passive";
}

function JobHeading({
  jobTitle,
  status,
}: {
  jobTitle: string;
  status: keyof typeof statusMap;
}) {
  const matchMap = statusMap[status];

  return (
    <div className="flex gap-3 items-center">
      <h3 className="text-[#1a1a1a] font-semibold">{jobTitle}</h3>
      <span
        className={cn(
          "border rounded-full text-[11px] py-0.5 px-2",
          matchMap.style,
        )}
      >
        {matchMap.text}
      </span>
    </div>
  );
}

function JobMetaLabel({
  icon: Icon,
  label,
}: {
  icon: IconType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[#6b7280] text-[13px]">
      <Icon />
      <span>{label}</span>
    </div>
  );
}

function JobMeta({
  department,
  location,
}: {
  department: string;
  location: string;
}) {
  return (
    <div className="flex items-center gap-1.5 mt-2.5">
      {!!department && <JobMetaLabel icon={LuBuilding2} label={department} />}

      {!!department && !!location && (
        <span className="mx-1 text-[#d1d5db]">/</span>
      )}

      {!!location && <JobMetaLabel icon={LuMapPin} label={location} />}
    </div>
  );
}

function JobBadge({ className, text }: { className: string; text: string }) {
  return (
    <span
      className={cn(
        "text-[11px] rounded-full py-1 px-2 font-medium border border-[#e5e5e5]",
        className,
      )}
    >
      {text}
    </span>
  );
}

function JobStatItem({
  icon: Icon,
  value,
  text,
}: {
  icon: IconType;
  value?: string | number;
  text: string;
}) {
  return (
    <div className="flex gap-1.5 items-center text-[#6b7280]">
      <Icon size={16} />

      {value !== undefined && <span className="text-[#1a1a1a]">{value}</span>}

      <span>{text}</span>
    </div>
  );
}

const JobIListItem = ({ job }: { job: JobIListItemProps }) => {
  const splitWorkType = job.workType.split(" ");
  const findWorkTypeMap =
    splitWorkType.length > 1
      ? (splitWorkType[0] + "-" + splitWorkType[1]).toLowerCase()
      : job.workType.toLowerCase();

  return (
    <div className="p-6 bg-white border border-[#e2e5e8] rounded-2xl group">
      <div className="flex justify-between">
        <div>
          <JobHeading jobTitle={job.jobTitle} status={job.status} />
          <JobMeta department={job.department} location={job.location} />
        </div>

        <JobListItemMenu jobStatus={job.status} jobId={job._id} />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <JobBadge
          className={workTypeMap[findWorkTypeMap]?.style ?? ""}
          text={workTypeMap[findWorkTypeMap]?.text ?? job.workType}
        />
        <JobBadge className="text-[#4b5563] bg-[#f3f4f6]" text={job.category} />
      </div>

      <div className="mt-5 pt-4 border-t border-t-[#f3f4f6] font-medium text-[13px] flex gap-5">
        <JobStatItem icon={LuUsers} value={job.applicants} text="başvuru" />
        <JobStatItem
          icon={LuCalendar}
          text={dayjs(job.createdAt).format("DD MMMM YYYY")}
        />
      </div>
    </div>
  );
};

export default JobIListItem;
