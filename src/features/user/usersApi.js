import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (email) => ({
                url: `/users?email=${email}`,
            }),
        })
    }),
})

export const { useGetUserQuery } = messagesApi;