import dayjs from "dayjs";

export const isNewApplicant = (
  createdAt: Date,
  status: { value: string; changedAt: Date }[],
) => {
  const hoursSinceCreated = dayjs().diff(dayjs(createdAt), "hour");
  const isPending = status[status.length - 1].value === "pending";
  return hoursSinceCreated < 24 || isPending;
};
