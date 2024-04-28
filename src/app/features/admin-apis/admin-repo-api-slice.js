//  admin repo api slice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const api = import.meta.env.VITE_APP_API_URL;

const adminRepoApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: api + "/api/admin/repository",
        headers: {
            "Content-Type": "application/json",
            "authorization": Cookies.get("authToken") || "",
        }
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