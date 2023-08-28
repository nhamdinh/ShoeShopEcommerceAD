/* eslint-disable no-restricted-globals */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESSTOKEN_STORAGE, API_LINK } from "../../../utils/constants";

export const productsApi = createApi({
  reducerPath: "productsApis",

  baseQuery: fetchBaseQuery({
    baseUrl: API_LINK,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Get token from store (userSlice)
      // @ts-ignore
      //   const apiKey = process.env.REACT_APP_API_KEY;
      const accessToken = localStorage.getItem(ACCESSTOKEN_STORAGE);

      // Add token to headers
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      //   headers.set("x-api-key", `${apiKey}`);

      return headers;
    },
  }),
  tagTypes: [
    "GetProducts",
    "GetProductsDetail",
    "GetCategorys",
    "GetBrands",
    "GetReviews",
  ],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (data) => ({
        url: `/products/all-admin?keyword=${data?.keyword}`,
        method: "GET",
      }),
      providesTags: ["GetProducts"],
    }),
    getProductsDetail: builder.query({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "GET",
      }),
      providesTags: ["GetProductsDetail"],
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `/products/delete/${data.productId}`,
        method: "POST",
      }),
      invalidatesTags: ["GetProducts"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.productId}/update`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["GetProductsDetail"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products/create`,
        method: "POST",
        body: data,
      }),
    }),
    getCategorys: builder.query({
      query: (data) => ({
        url: `/categorys/all-admin`,
        method: "GET",
      }),
      providesTags: ["GetCategorys"],
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/categorys/delete/${data.categoryId}`,
        method: "POST",
      }),
      invalidatesTags: ["GetCategorys"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categorys/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GetCategorys"],
    }),
    getBrands: builder.query({
      query: (data) => ({
        url: `/categorys/all-admin/brand`,
        method: "GET",
      }),
      providesTags: ["GetBrands"],
    }),
    deleteBrand: builder.mutation({
      query: (data) => ({
        url: `/categorys/delete/${data.brandId}/brand`,
        method: "POST",
      }),
      invalidatesTags: ["GetBrands"],
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: `/categorys/create-brand`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GetBrands"],
    }),
    uploadImg: builder.mutation({
      query: (data) => ({
        url: `/upload?folder=${data?.folder}`,
        method: "POST",
        body: data?.formData,
      }),
    }),
    getReviews: builder.query({
      query: (data) => ({
        url: `/products/all-admin/reviews`,
        method: "GET",
      }),
      providesTags: ["GetReviews"],
    }),
    updateReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.reviewId}/update-review`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetCategorysQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUploadImgMutation,
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useCreateBrandMutation,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} = productsApi;
