//  auth api slice 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const api = import.meta.env.VITE_APP_API_URL;

const authApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/auth"

    }),
    reducerPath: "authApi",

    endpoints: (builder) => ({

        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "/token",
                method: "POST",
                body: { username, password },
            })

        }),
    })


})
export const {
    useLoginMutation
} = authApiSlice;

export default authApiSlice
