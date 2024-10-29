import { axiosInstance } from '../axiosInstance';
import { Promotions } from '../../pages/promotions/index';

const API_URL = '/promotions';  

export const fetchPromotions = async (): Promise<Promotions[]> => {
  const response = await axiosInstance.get<Promotions[]>(API_URL);
  return response.data;
};

export const createPromotion = async (promotion: Omit<Promotions, 'id'>): Promise<Promotions> => {
  const response = await axiosInstance.post<Promotions>(API_URL, promotion);
  return response.data;
};

export const updatePromotion = async (id: number, promotion: Omit<Promotions, 'id'>): Promise<Promotions> => {
  const response = await axiosInstance.put<Promotions>(`${API_URL}/${id}`, promotion);
  return response.data;
};

export const deletePromotion = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};
