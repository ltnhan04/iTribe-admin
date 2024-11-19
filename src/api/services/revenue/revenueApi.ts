import { axiosInstance } from "../../../config/axiosInstance";

// Lấy doanh thu theo ngày
export const fetchDailyRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/day`);
};
// Tính tổng doanh thu
export const fetchTotalRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/total`);
};
// Tính tổng doanh thu
export const fetchTotalProduct = async () => {
  return await axiosInstance.get(`api/admin/revenue/product`);
};
