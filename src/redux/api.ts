import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { Data, Root, newProduct } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
    timeout: 10000,
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<Data, void>({
      query: () => `/api/admin/products`,
    }),
    getProduct: builder.query<Root, string>({
      query: (id) => `/api/admin/products/${id}`,
    }),
    createProduct: builder.mutation<Root, newProduct>({
      query: (product) => ({
        url: `/api/admin/products`,
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation<Root, string>({
      query: (id) => ({
        url: `/api/admin/products/${id}`,
        method: "PUT",
      }),
    }),
    deleteProduct: builder.mutation<string, string>({
      query: (id) => ({
        url: `/api/admin/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
