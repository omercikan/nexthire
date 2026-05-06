import { User } from "@/shared/types";
// import { CVDataFields } from "@/shared/types/resume";
// import { FavoriteDataFields } from "@/shared/types/favorite";

/**
 * @interface Candidate
 * @extends User
 * @description The user data stored in DB for users with candidate role
 */
export interface Candidate extends User {
  // acceptedTerms: string;
  // photo: string;
  // createdWith: string;
  dateOfBirth: Date;
  gender: string;
  age: string;
  city: string;
  title: string;
  profilePhoto: string;
  profilePhotoId: string;
  lastWorkPlace: string;
  experienceTime: string;
  // favoriteEmployers: FavoriteDataFields[];
  // favoriteJobs: FavoriteDataFields[];
  // uploadedResumes: CVDataFields[];
}
