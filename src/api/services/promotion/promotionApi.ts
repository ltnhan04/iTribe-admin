import { axiosInstance } from "../../../config/axiosInstance";

export const fetchPromotions = async () => {
  const response = await axiosInstance.get(`/api/admin/promotions`);
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
  maxUsage?: number;
  usedCount: number;
}) => {
  const response = await axiosInstance.post(`/api/admin/promotions`, promotionData);
  return response.data;
};

export const incrementUsedCount = async (id: string) => {
  const response = await axiosInstance.patch(`/api/admin/promotions/${id}/increment`);
  return response.data;
};


export const updatePromotion = async (id: string, promotionData: {
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validTo: Date;
  isActive?: boolean;
  maxUsage?: number;
  usedCount?: number;
}) => {
  const response = await axiosInstance.put(`/api/admin/promotions/${id}`, promotionData);
  return response.data; 
};

export const deletePromotion = async (id: string) => {
  const response = await axiosInstance.delete(`/api/admin/promotions/${id}`);
  return response.data; 
};
