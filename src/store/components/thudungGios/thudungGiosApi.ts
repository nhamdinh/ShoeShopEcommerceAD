/* eslint-disable no-restricted-globals */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESSTOKEN_STORAGE, API_LINK } from "../../../utils/constants";

export const thudungGiosApi = createApi({
  reducerPath: "thudungGiosApis",

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
  tagTypes: ["getThudungGios__TAG"],
  endpoints: (builder) => ({
    getThudungGios: builder.query({
      query: (data) => ({
        url: `/thudung/get-all`,
        method: "GET",
        params: data,
      }),
      providesTags: ["getThudungGios__TAG"],
    }),
    createThudungGio: builder.mutation({
      query: (data) => ({
        url: `/thudung/create`,
        method: "POST",
        body: data,
      }),
    }),
    updatedOrderPay: builder.mutation({
      query: (data) => ({
        url: `/thudung/updatedOrderPay`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getThudungGios__TAG"],
    }),
    findThuDungGioById: builder.mutation({
      query: (data) => ({
        url: `/thudung/detail`,
        method: "POST",
        body: data,
      }),
    }),
    updatedOrderById: builder.mutation({
      query: (data) => ({
        url: `/thudung/updatedOrderById`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetThudungGiosQuery,
  useCreateThudungGioMutation,
  useFindThuDungGioByIdMutation,
  useUpdatedOrderPayMutation,
  useUpdatedOrderByIdMutation,
} = thudungGiosApi;
