//  admin repo api slice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = import.meta.env.VITE_APP_API_URL;

const adminRepoApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: api + "/api/admin/repository",
        prepareHeaders: (headers, { getState }) => {
            // Extract the authToken from the current state
            const authToken = getState().auth.authToken;
            // If we have a token set in state, let's assume that we should be passing it
            if (authToken) {
                headers.set('authorization', authToken);
            }
            return headers;
        },
    }),
    reducerPath: "adminRepoApi",
    tagTypes: ["adminRepoApi"],

    endpoints: (builder) => ({
        getAdminRepo: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
        }),

        // get one record in repo
        getOneAdminRepo: builder.query({
            query: ({ id, subId }) => ({
                url: `/${id}/${subId}`,
                method: "GET",
            }),
        }),

        createAdminRepo: builder.mutation({
            query: (adminRepo) => ({
                url: "/",
                method: "POST",
                body: adminRepo
            }),
        }),

        updateAdminRepo: builder.mutation({
            query: (adminRepo) => ({
                url: `/${adminRepo.id}`,
                method: "PATCH",
                body: adminRepo
            }),
        }),

        deleteAdminRepo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),

    }),
});
export const {
    useGetAdminRepoQuery,
    useGetOneAdminRepoQuery,
    useCreateAdminRepoMutation,
    useUpdateAdminRepoMutation,
    useDeleteAdminRepoMutation
} = adminRepoApiSlice
export default adminRepoApiSlice