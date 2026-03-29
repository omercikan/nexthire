type value = "pending" | "reviewed" | "accepted" | "rejected";

export interface StatusList {
  _id?: string;
  value: value;
  changedAt: Date;
}
