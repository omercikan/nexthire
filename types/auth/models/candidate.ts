import { User } from "@/types";
import { CVDataFields } from "@/types/resume";
import { FavoriteDataFields } from "@/types/favorite";

/**
 * @interface Candidate
 * @extends User
 * @description The user data stored in DB for users with candidate role
 */
export interface Candidate extends User {
  id: string;
  acceptedTerms: string;
  photo: string;
  createdWith: string;
  favoriteEmployers: FavoriteDataFields[];
  favoriteJobs: FavoriteDataFields[];
  uploadedResumes: CVDataFields[];
}
