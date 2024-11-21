import { axiosInstance } from "../../../config/axiosInstance";

export const fetchDailyRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/day`);
};
export const fetchTotalRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/total`);
};
export const fetchTotalProduct = async () => {
  return await axiosInstance.get(`api/admin/revenue/product`);
};

export const revenueLastDays = async (days: number) => {
  return await axiosInstance.get(`/api/admin/revenue/last/${days}`);
};
