import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/auth',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        getUserData: builder.query({
            query: () => '/me',
            // Добавляем запрос с обязательным токеном
        }),
        getAllUsers: builder.query({
            query: () => '/userslist',
            // Добавляем запрос с обязательным токеном
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refresh-token',
                method: 'POST',
            }),
        })
    })
});



export const { useLoginUserMutation, useRegisterUserMutation, useRefreshTokenMutation, useGetUserDataQuery, useGetAllUsersQuery } = authAPI;