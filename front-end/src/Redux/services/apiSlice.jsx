import {fetchBaseQuery , createApi} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/',
    baseUrl: 'https://prodmaster-backend.onrender.com/api/',

    prepareHeaders: (headers) => {
        const token = localStorage.getItem('ProdUsertoken');

        if(token) {
            headers.set('authorization' , `Bearer ${token}`);
        }
        return headers;
    }
});

export const apiSlice = createApi({

    reducerPath: 'prodMaster',
    baseQuery ,

    endpoints: (builder) => ({
        signUpUser : builder.mutation ({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data
            })
        }),

        loginUser: builder.mutation({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data
            })
        }),
    })
});


export const {useSignUpUserMutation , useLoginUserMutation} = apiSlice;