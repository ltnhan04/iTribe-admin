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
  }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query<Data, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const result = await fetchWithBQ(`/api/admin/products`);
        if (result.error && result.error.status === 404) {
          return { data: { data: [] } };
        }
        return result as { data: Data };
      },
      providesTags: ["Products"],
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
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
