//  admin object api slice

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = import.meta.env.VITE_APP_API_URL;

const adminObjectApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: api + "/api/admin/object",
    prepareHeaders: (headers, { getState }) => {
      // Extract the authToken from the current state
      const authToken = getState().auth.authToken;
      // If we have a token set in state, let's assume that we should be passing it
      if (authToken) {
        headers.set("authorization", authToken);
      }
      return headers;
    },
  }),
  reducerPath: "adminObjectApi",
  tagTypes: ["adminObjectApi"],
  endpoints: (builder) => ({
    getAllAdminObjects: builder.query({
      query: ({ search }) => ({
        url: search ? `?search=${search}` : "/",
        method: "GET",
      }),
      providesTags: ["adminObjectApi"],
    }),
    getAdminObject: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["adminObjectApi"],
    }),

    createAdminObject: builder.mutation({
      query: (adminObject) => ({
        url: "/",
        method: "POST",
        body: adminObject,
      }),
      invalidatesTags: ["adminObjectApi"],
    }),

    updateAdminObject: builder.mutation({
      query: (adminObject) => ({
        url: `/`,
        method: "PUT",
        body: adminObject,
      }),
      invalidatesTags: ["adminObjectApi"],
    }),

    deleteAdminObject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",

      }),
      invalidatesTags: ["adminObjectApi"],
    }),
  }),
});

export const {
  useGetAllAdminObjectsQuery,
  useGetAdminObjectQuery,
  useCreateAdminObjectMutation,
  useUpdateAdminObjectMutation,
  useDeleteAdminObjectMutation,
} = adminObjectApiSlice;
export default adminObjectApiSlice;

