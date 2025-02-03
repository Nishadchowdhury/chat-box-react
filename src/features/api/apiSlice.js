import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:9000" : ""
    }),
    tagTypes: [],
    endpoints: (builder) => ({})

})