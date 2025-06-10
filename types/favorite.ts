import { Candidate } from "@/types/index";

export interface FavoriteDataFields {
  companyEID: string;
  companyLogo: string;
  companyName: string;
  companyLocation: string;
  numberOfEmployees: string;
}

export enum FavoriteField {
  Jobs = "favoriteJobs",
  Employers = "favoriteEmployers",
}

export interface Favorite {
  data: {
    dataField: FavoriteDataFields;
    eid: string;
  };
  extraField?: string;
  fieldName: FavoriteField;
}

export interface FavoriteAPIRoute {
  data: Favorite;
  id: string;
  user: Candidate;
  updatedData: Candidate;
  setFavoritePath: string;
  fieldName: FavoriteField;
}
