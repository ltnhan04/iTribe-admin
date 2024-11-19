import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { ProductVariant, ProductVariantRoot, VariantRoot } from "../types";

export const productVariantApi = createApi({
  reducerPath: "productVariantApi",
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
  tagTypes: ["ProductVariants"],

  endpoints: (builder) => ({
    getProductVariants: builder.query<VariantRoot, string>({
      query: (productId) => `/api/admin/variant/${productId}`,
      providesTags: (result, _error, productId) =>
        result?.variants
          ? result.variants.map((variant) => ({
              type: "ProductVariants",
              id: variant._id,
            }))
          : [{ type: "ProductVariants", id: productId }],
    }),

    createProductVariant: builder.mutation<ProductVariantRoot, FormData>({
      query: (formData) => ({
        url: `/api/admin/products/variant`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ProductVariants"],
    }),

    updateProductVariant: builder.mutation<
      ProductVariantRoot,
      { variantId: string; updatedVariant: Partial<ProductVariant> }
    >({
      query: ({ variantId, updatedVariant }) => ({
        url: `/api/admin/variant/${variantId}`,
        method: "PUT",
        body: updatedVariant,
      }),
      invalidatesTags: ["ProductVariants"],
    }),

    deleteProductVariant: builder.mutation<{ message: string }, string>({
      query: (variantId) => ({
        url: `/api/admin/products/variant/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductVariants"],
    }),
  }),
});

export const {
  useGetProductVariantsQuery,
  useCreateProductVariantMutation,
  useUpdateProductVariantMutation,
  useDeleteProductVariantMutation,
} = productVariantApi;
