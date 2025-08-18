import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GeocodeApi = createApi({
  reducerPath: "gecodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/geocode/" }),
  endpoints: (builder) => ({
    getGeocode: builder.query<
      { geo: { lat: number; lon: number } },
      { query: string }
    >({
      query: ({ query }) => `?q=${query}`,
    }),
  }),
});

export const { useGetGeocodeQuery } = GeocodeApi;
