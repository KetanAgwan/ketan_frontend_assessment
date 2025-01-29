import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
  }),
  endpoints: (builder) => ({
    getDomains: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetDomainsQuery } = domainApi;
