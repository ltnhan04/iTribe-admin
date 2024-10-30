import { axiosInstance } from "../../axiosInstance";

export const fetchPromotions = async () => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/admin/promotions`
  );
  return response.data;
};

export const createPromotion = async (id: string) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/admin/promotions/${id}`
  );
  return response.data;
};

export const updatePromotion = async (id: string) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/admin/promotions/${id}`
  );
  return response.data;
};

export const deletePromotion = async (id: string) => {
  const response = await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/admin/promotions/${id}`
  );
  return response.data;
};
