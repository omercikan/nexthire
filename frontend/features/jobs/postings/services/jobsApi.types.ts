export interface FilterJobQueryArgs {
  page: number;
  perPage: 10 | "all";
  sort: 1 | -1;
  jobTitle: string;
  location: string;
  workType: string;
  experience: string[];
  careerLevel: string[];
}
