import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => ({
                url: `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1_limit=5`,
            }),
        })
    }),
})

export const { useGetMessagesQuery } = messagesApi;