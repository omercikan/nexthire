import { Candidate } from "@/shared/types/models/candidate";
import { FavoriteDataFields } from "@/shared/types/favorite";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    addFavorite: builder.mutation<
      object,
      {
        data: FavoriteDataFields;
        postID: string;
        user: Candidate;
        updatedData: Candidate;
        fieldName: string;
      }
    >({
      query: ({ data, postID, user, updatedData, fieldName }) => ({
        url: "favorites",
        method: "POST",
        body: {
          data: data,
          id: postID,
          user: user,
          updatedData: updatedData,
          setFavoritePath: "candidates",
          fieldName,
        },
      }),
    }),
  }),
});

export const { useAddFavoriteMutation } = favoritesApi;
