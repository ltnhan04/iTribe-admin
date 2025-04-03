import { axiosInstance } from "../../../config/axiosInstance";

export const fetchPromotions = async () => {
  const response = await axiosInstance.get(`/api/v1/admin/promotions`);
  return response.data;
};

export const getPromotion = async (id: string) => {
  return await axiosInstance.get(`/api/admin/promotions/${id}`);
};

export const createPromotion = async (promotionData: {
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validTo: Date;
  isActive?: boolean;
  maxUsage: number;
  minOrderAmount: number;
}) => {
  return await axiosInstance.post(`/api/admin/promotions`, promotionData);
};

export const updatePromotion = async (
  id: string,
  promotionData: {
    code: string;
    discountPercentage: number;
    validFrom: Date;
    validTo: Date;
    isActive?: boolean;
    maxUsage?: number;
    minOrderAmount?: number;
  }
) => {
  return await axiosInstance.put(`/api/admin/promotions/${id}`, promotionData);
};

export const deletePromotion = async (id: string) => {
  return await axiosInstance.delete(`/api/admin/promotions/${id}`);
};
