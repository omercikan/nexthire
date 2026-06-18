export interface CreateInterviewRequest {
  candidateId: string;
  positionId: string;
  scheduledAt: string;
  scheduledTime: string;
  type: "online" | "in_person";
  meetingLink?: string;
  location?: string;
  positionTitle: string;
  notes?: string;
}
