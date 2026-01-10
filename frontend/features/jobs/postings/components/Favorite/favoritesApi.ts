import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FavoriteItemProps } from "./favorite.types";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
    credentials: "include",
  }),
  tagTypes: ["Favorite"],
  endpoints: (builder) => ({
    handleFavorite: builder.mutation<FavoriteItemProps, FavoriteItemProps>({
      query: (body) => ({
        url: "/favorite",
        method: "POST",
        body: body,
      }),
      async onQueryStarted({ jobId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoritesApi.util.updateQueryData(
            "getFavorites",
            undefined,
            (draft) => {
              draft.push(jobId);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, _error, { jobId }) => {
        return result ? [{ type: "Favorite", id: jobId }] : ["Favorite"];
      },
    }),

    getFavorites: builder.query<string[], void>({
      query: () => ({
        method: "GET",
        url: "/favorite",
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map((id) => ({ type: "Favorite" as const, id })),
              "Favorite",
            ]
          : ["Favorite"];
      },
    }),
  }),
});

export const { useHandleFavoriteMutation, useGetFavoritesQuery } = favoritesApi;
