import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_order=desc&_page=1&_limit=5`,
        }),

        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) => `/conversations?participants_like=${userEmail}-${participantEmail}&&${participantEmail}-${userEmail}`,
        }),

        addConversation: builder.mutation({
            query: (data) => ({
                url: '/conversations',
                method: "POST",
                body: data,
            })
        }),
        editConversation: builder.mutation({
            query: ({ id, data }) => ({
                url: `/conversations/${id}`,
                method: "POST",
                body: data,
            })
        }),


    }),
})


export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation
} = conversationApi;