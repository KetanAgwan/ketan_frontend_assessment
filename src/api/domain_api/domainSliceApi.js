import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
  }),
  tagTypes: ["Domain"],
  endpoints: (builder) => ({
    getDomains: builder.query({
      query: () => "/",
      providesTags: ["Domain"],
    }),
    createDomain: builder.mutation({
      query: (domain) => ({
        url: "/",
        method: "POST",
        body: domain,
      }),
      invalidatesTags: (result, error) => {
        if (!error) return ["Domain"];
        return [];
      },
    }),
    updateDomain: builder.mutation({
      query: ({ id, ...domainData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: domainData,
      }),
      invalidatesTags: (result, error) => {
        if (!error) return ["Domain"];
        return [];
      },
    }),
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => {
        if (!error) return ["Domain"];
        return [];
      },
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi;
