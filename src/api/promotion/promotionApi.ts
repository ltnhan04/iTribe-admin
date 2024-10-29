import { axiosInstance } from '../axiosInstance';
interface Promotions {
  id: number;
  promotionName: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
}

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin/promotions`;  

export const fetchPromotions = async (): Promise<Promotions[]> => {
  const response = await axiosInstance.get<Promotions[]>(API_URL);
  return response.data;
};

export const createPromotion = async (promotion: Omit<Promotions, 'id'>): Promise<Promotions> => {
  const response = await axiosInstance.post<Promotions>(API_URL, promotion);
  return response.data;
};

export const updatePromotion = async (id: number | string, promotion: Omit<Promotions, 'id'>): Promise<Promotions> => {
  const response = await axiosInstance.put<Promotions>(`${API_URL}/${id}`, promotion);
  return response.data;
};

export const deletePromotion = async (id: number | string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};
