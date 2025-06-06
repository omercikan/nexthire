import { Candidate, Employer } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocumentData } from "firebase/firestore";

export const bestCompaniesApi = createApi({
  reducerPath: "bestCompaniesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  tagTypes: ["BestCompanies"],
  endpoints: (builder) => ({
    getBestCompanies: builder.query<
      { employers: Employer[]; status: number },
      void
    >({
      query: () => "employers/bestCompany",
      providesTags: ["BestCompanies"],
      keepUnusedDataFor: 60,
    }),
    addFavoriteCompany: builder.mutation<
      object,
      {
        data: DocumentData;
        id: string;
        user: Candidate;
        updatedData: Candidate;
        fieldName: string;
      }
    >({
      query: ({ data, id, user, updatedData, fieldName }) => ({
        url: "favorites",
        method: "POST",
        body: JSON.stringify({
          data: data,
          id: id,
          user: user,
          updatedData: updatedData,
          setFavoritePath: "candidates",
          fieldName,
        }),
      }),
      invalidatesTags: ["BestCompanies"],
    }),
  }),
});

export const { useGetBestCompaniesQuery, useAddFavoriteCompanyMutation } =
  bestCompaniesApi;
