import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InterviewSchedulerErrors {
  scheduledAt: string;
  scheduledTime: string;
  type: string;
}

interface InterviewSchedulerState {
  scheduledAt: string | null;
  scheduledTime: string | null;
  type: "online" | "in_person" | null;
  meetingLink: string | null;
  location: string | null;
  notes: string | null;
  errors: InterviewSchedulerErrors;
}

const initialState: InterviewSchedulerState = {
  scheduledAt: null,
  scheduledTime: null,
  type: null,
  meetingLink: null,
  location: null,
  notes: null,
  errors: {
    scheduledAt: "",
    scheduledTime: "",
    type: "",
  },
};

export const interviewSchedulerSlice = createSlice({
  name: "interviewScheduler",
  initialState,
  reducers: {
    setScheduledDate: (state, action: PayloadAction<string | null>) => {
      state.scheduledAt = action.payload;
    },

    setScheduledTime: (state, action: PayloadAction<string | null>) => {
      state.scheduledAt = action.payload;
    },

    setType: (state, action: PayloadAction<"online" | "in_person" | null>) => {
      state.type = action.payload;
      state.meetingLink = null;
      state.location = null;
    },

    setMeetingLink: (state, action: PayloadAction<string | null>) => {
      state.meetingLink = action.payload;
    },

    setLocation: (state, action: PayloadAction<string | null>) => {
      state.location = action.payload;
    },

    setNotes: (state, action: PayloadAction<string | null>) => {
      state.notes = action.payload;
    },

    resetScheduler: () => initialState,

    setError: (
      state,
      action: PayloadAction<Partial<InterviewSchedulerErrors>>,
    ) => {
      state.errors = { ...state.errors, ...action.payload };
    },

    clearError: (
      state,
      action: PayloadAction<keyof InterviewSchedulerErrors>,
    ) => {
      state.errors[action.payload] = "";
    },

    clearAllErrors: (state) => {
      state.errors = initialState.errors;
    },
  },
});

export const {
  setScheduledDate,
  setScheduledTime,
  setType,
  setMeetingLink,
  setLocation,
  setNotes,
  resetScheduler,
} = interviewSchedulerSlice.actions;

export default interviewSchedulerSlice.reducer;
