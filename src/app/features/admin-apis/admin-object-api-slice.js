//  admin object api slice 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const api = import.meta.env.VITE_APP_API_URL;

const adminObjectApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: api + "/api/admin/object",
        headers: {
            "Content-Type": "application/json",
            "authorization": Cookies.get("authToken") || "",
        }
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
                body: adminObject
            }),
        }),

        updateAdminObject: builder.mutation({
            query: (adminObject) => ({
                url: `/${adminObject.id}`,
                method: "PATCH",
                body: adminObject
            }),
        }),

        deleteAdminObject: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),

    })
});

export const {
    useGetAdminObjectQuery,
    useCreateAdminObjectMutation,
    useUpdateAdminObjectMutation,
    useDeleteAdminObjectMutation
} = adminObjectApiSlice
export default adminObjectApiSlice