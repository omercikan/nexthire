import { SortOrder } from "mongoose";

// Regex filter type for job search queries
export type RegexFilter = {
  [key: string]: unknown;
  $or?: {
    [key: string]: { $regex: string; $options: string };
  }[];
  $text?: { $search: string };
};

// All available fields used for filtering and pagination in job listing requests
export type PerPage = 10 | "all";

export interface FilteredJobFields {
  page: number;
  perPage: PerPage;
  sort: -1 | 1;
  jobTitle: string;
  location: string;
  workType: string;
  experience: string;
  careerLevel: string;
}

// Query parameters used for pagination and sorting
export type QueryFields = Pick<FilteredJobFields, "page" | "perPage" | "sort">;

// Body parameters used for job filtering
export type BodyFields = Omit<FilteredJobFields, "page" | "perPage" | "sort">;
