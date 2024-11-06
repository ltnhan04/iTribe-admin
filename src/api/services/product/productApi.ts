import { axiosInstance } from "../../../config/axiosInstance";
import { Product } from "./types";

export const createProducts = async ({ description, name, slug }: Product) => {
  return await axiosInstance.post(`/api/admin/products`, {
    description,
    name,
    slug,
  });
};

export const updateProduct = async (id: string) => {
  return await axiosInstance.put(`/api/admin/products/${id}`);
};

export const getProducts = async () => {
  return await axiosInstance.get(`/api/admin/products`);
};

export const getProduct = async (id: string) => {
  return await axiosInstance.get(`$/api/admin/products/${id}`);
};

export const deleteProduct = async (id: string) => {
  return await axiosInstance.delete(`/api/admin/products/${id}`);
};
