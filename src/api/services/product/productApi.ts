import { axiosInstance } from "../../axiosInstance";
import { Product } from "./types";

export const createProducts = async ({
  description,
  images,
  price,
  category,
  slug,
}: Product) => {
  return await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/admin/products`,
    { description, images, price, category, slug }
  );
};

export const updateProduct = async (id: string) => {
  return await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`
  );
};

export const getProducts = async () => {
  return await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/admin/products`
  );
};

export const getProduct = async (id: string) => {
  return await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`
  );
};
