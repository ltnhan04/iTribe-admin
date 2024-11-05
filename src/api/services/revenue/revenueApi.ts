import { axiosInstance } from "../../../config/axiosInstance";

// Lấy doanh thu theo ngày
export const fetchDailyRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/day`);
};

// Lấy doanh thu theo tuần
export const fetchWeeklyRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/week`);
};

// Lấy doanh thu theo năm
export const fetchYearlyRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/year`);
};

// Tính tổng doanh thu
export const fetchTotalRevenue = async () => {
  return await axiosInstance.get(`/api/admin/revenue/total`);
};
