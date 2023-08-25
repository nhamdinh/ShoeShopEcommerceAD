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
  tagTypes: ["GetProducts", "GetProductsDetail", "GetCategorys"],
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
    getBrands: builder.query({
      query: (data) => ({
        url: `/categorys/get-all-brands`,
        method: "GET",
      }),
    }),
    uploadImg: builder.mutation({
      query: (data) => ({
        url: `/upload`,
        method: "POST",
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
  useUploadImgMutation,
  useGetBrandsQuery,
} = productsApi;
