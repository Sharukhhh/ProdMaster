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
    tagTypes: ['Category' , 'Sub Category', 'Products' , 'list'],

    endpoints: (builder) => ({
        // --------------------User Auth Endpoints - START----------------------
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
        // --------------------User Auth Endpoints - END--------------------


        // --------------------Category Management Endpoints - START--------------------
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
            }),
            invalidatesTags: ['Sub Category']
        }),

        getSubCategories: builder.query({
            query: () => ({
                url: 'category/subcategories',
                method: 'GET',
            }),
            providesTags: ['Sub Category']
        }),
        // --------------------Category Management Endpoints - END--------------------


        // --------------------Product management endpoints - START--------------------
        saveProduct: builder.mutation({
            query: (data) => ({
                url: 'product/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products']
        }),

        getAllProducts: builder.query({
            query: () => ({
                url: 'product/get',
                method: 'GET',
            }),
            providesTags: ['Products']
        }),

        getSingleProduct: builder.query({
            query: (productId) => ({
                url: `product/single/${productId}`,
                method: 'GET'
            }),
            providesTags: ['Products']
        }),

        editProduct: builder.mutation({
            query: ({productId , ...data}) => ({
                url: `product/edit/${productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        // --------------------Product management endpoints - END--------------------


        // --------------------Wishlist management endpoints - Start--------------------
        toggleWishlist: builder.mutation({
            query: (productId) => ({
                url: `list/toggle/${productId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['list']
        }),

        getWishlistItems: builder.query({
            query: () => ({
                url: 'list/get',
                method: 'GET',
            }),
            providesTags: ['list' , 'Products']
        })
        // --------------------Wishlist management endpoints - END--------------------
    })
});


export const {useSignUpUserMutation , useLoginUserMutation , 
    useAddMainCategoryMutation , useGetCategoriesQuery , useAddSubCategoryMutation, useGetSubCategoriesQuery,
    useSaveProductMutation , useGetAllProductsQuery, useGetSingleProductQuery, useEditProductMutation,
    useToggleWishlistMutation , useGetWishlistItemsQuery
} = apiSlice;