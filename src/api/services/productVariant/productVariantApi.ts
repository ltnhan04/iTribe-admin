import { axiosInstance } from "../../../config/axiosInstance";
import type { ProductVariant } from "./types";

export const getProductVariants = async (productId: string) => {
  return await axiosInstance.get(`/api/admin/variant/${productId}`);
};

export const createProductVariant = async ({
  productId,
  colorName,
  colorCode,
  storage,
  price,
  stock,
}: ProductVariant) => {
  return await axiosInstance.post(`/api/admin/variant`, {
    productId,
    colorName,
    colorCode,
    storage,
    price,
    stock,
  });
};

export const updateProductVariant = async (variantId: string) => {
  return await axiosInstance.put(`/api/admin/variant/${variantId}`);
};

export const deleteProductVariant = async (variantId: string) => {
  return await axiosInstance.delete(`/api/admin/variant/${variantId}`);
};
