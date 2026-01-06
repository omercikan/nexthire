// All available fields used for filtering and pagination in job listing requests
export type PerPage = 10 | "all";

export type SortOrder = 1 | -1;

export interface FilteredJobFields {
  page: number;
  perPage: PerPage;
  sort: SortOrder;
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
