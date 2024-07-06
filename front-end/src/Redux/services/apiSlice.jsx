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
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        // User Auth Endpoints - START
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
        // User Auth Endpoints - END


        // Category Management Endpoints - START
        addMainCategory: builder.mutation({
            query: (data) => ({
                url: 'category/add_category',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Category'],
        }),
        getCategories: builder.query({
            query: () => ({
                url: 'category/main_categories',
                method: 'GET'
            }),
            providesTags: ['Category']
        }),
        addSubCategory: builder.mutation({
            query: (data) => ({
                url: 'category/add_subcategory',
                method: 'POST',
                body: data
            })
        })
        // Category Management Endpoints - END
    })
});


export const {useSignUpUserMutation , useLoginUserMutation , useAddMainCategoryMutation , useGetCategoriesQuery , useAddSubCategoryMutation} = apiSlice;