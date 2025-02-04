import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: data.accessToken,
                            user: data.user
                        })
                    );

                    dispatch(userLoggedIn({
                        accessToken: data.accessToken,
                        user: data.user
                    }))
                } catch (error) {
                    // do nothing instead from UI.
                }
            }
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: data.accessToken,
                            user: data.user
                        })
                    );

                    dispatch(userLoggedIn({
                        accessToken: data.accessToken,
                        user: data.user
                    }))
                } catch (error) {
                    // do nothing instead from UI.
                }
            }
        })
    }),
})

export const { useLoginMutation, useRegisterMutation } = authApi;