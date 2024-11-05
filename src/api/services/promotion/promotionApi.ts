import { axiosInstance } from "../../../config/axiosInstance";

export const fetchPromotions = async () => {
  const response = await axiosInstance.get(`/api/admin/promotions`);
  return response.data;
};

export const createPromotion = async (id: string) => {
  const response = await axiosInstance.post(`/api/admin/promotions/${id}`);
  return response.data;
};

export const updatePromotion = async (id: string) => {
  const response = await axiosInstance.post(`/api/admin/promotions/${id}`);
  return response.data;
};

export const deletePromotion = async (id: string) => {
  const response = await axiosInstance.delete(`/api/admin/promotions/${id}`);
  return response.data;
};
