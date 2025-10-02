import { Candidate } from "./models/candidate";

export interface FavoriteDataFields {
  postID: string;
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
    postID: string;
  };
  extraField?: string;
  fieldName: FavoriteField;
  favoriteButtonClass?: string;
  favoriteIconClass?: string;
}

export interface FavoriteAPIRoute {
  data: Favorite;
  id: string;
  user: Candidate;
  updatedData: Candidate;
  setFavoritePath: string;
  fieldName: FavoriteField;
}
