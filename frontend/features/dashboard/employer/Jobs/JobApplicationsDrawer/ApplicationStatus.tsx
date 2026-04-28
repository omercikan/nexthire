import { cn } from "@/shared/libs/utils";
import { statusMap } from "./constants/statusMap";
import { isNewApplicant } from "./helpers/applicantHelpers";
import { ApplicantStatus } from "./types/applicantTypes";

function ApplicationStatus({
  createdAt,
  status,
}: {
  createdAt: Date;
  status: ApplicantStatus[];
}) {
  const isNew = isNewApplicant(createdAt, status);
  const lastStatus = status.at(-1)?.value as keyof typeof statusMap;

  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full border text-[10px] px-1.5 font-medium",
        statusMap[isNew ? "Yeni" : lastStatus].style,
      )}
    >
      {isNew ? "Yeni" : statusMap[lastStatus].value}
    </span>
  );
}

export default ApplicationStatus;
