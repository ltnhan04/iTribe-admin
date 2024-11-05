import { axiosInstance } from "../../../config/axiosInstance";

export const getAllUsers = async () => {
  return await axiosInstance.get(`/api/admin/users`);
};

export const getUserDetails = async (userId: string) => {
  return await axiosInstance.get(`/api/admin/users/${userId}`);
};

export const banUser = async (userId: string) => {
  return await axiosInstance.post(`/api/admin/users/ban/${userId}`);
};

export const unBanUser = async (userId: string) => {
  return await axiosInstance.patch(`/api/admin/users/unban/${userId}`);
};

export const getUserOrders = async (userId: string) => {
  return await axiosInstance.get(`/api/admin/users/userOrder/${userId}`);
};

export const getUserOrderDetail = async (userId: string) => {
  return await axiosInstance.get(`/api/admin/userOrderDetail/${userId}`);
};

export const paginatedUsers = async (page: number, limit: number) => {
  return await axiosInstance.get(
    `/api/admin/paginate?page=${page}&limit=${limit}`
  );
};
