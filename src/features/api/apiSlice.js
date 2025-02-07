import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:9000" : "",
        prepareHeaders: async (headers, { getState, endpoint/*endpoint name to filter */ }) => {
            const token = getState()?.auth?.accessToken;
            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers; // after modifying the headers we need to return it because there are many default header that must be passed
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({})// we'll inject the endpoints later.

})