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
    getAdminObject: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),

    createAdminObject: builder.mutation({
      query: (adminObject) => ({
        url: "/",
        method: "POST",
        body: adminObject,
      }),
    }),

    updateAdminObject: builder.mutation({
      query: ({ adminObject, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: adminObject,
      }),
    }),

    deleteAdminObject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminObjectQuery,
  useCreateAdminObjectMutation,
  useUpdateAdminObjectMutation,
  useDeleteAdminObjectMutation,
} = adminObjectApiSlice;
export default adminObjectApiSlice;

