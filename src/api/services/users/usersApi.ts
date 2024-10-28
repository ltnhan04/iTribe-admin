// userApi.ts
import { axiosInstance } from "../../axiosInstance"; // Adjust the path if necessary

// Fetch all users
export const getAllUsers = async () => {
  return await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/admin/users`);
};

// Fetch a specific user by ID
export const getUserDetails = async (userId: string) => {
  return await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`);
};

// Ban a user
export const banUser = async (userId: string) => {
  return await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/admin/ban/${userId}`);
};

// Unban a user
export const unBanUser = async (userId: string) => {
  return await axiosInstance.patch(`${import.meta.env.VITE_API_URL}/api/admin/unban/${userId}`);
};

// Get user orders
export const getUserOrders = async (userId: string) => {
  return await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/admin/userOrder/${userId}`);
};

// Get user order details
export const getUserOrderDetail = async (userId: string) => {
  return await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/admin/userOrderDetail/${userId}`);
};

// Fetch paginated users
export const paginatedUsers = async (page: number, limit: number) => {
  return await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/admin/paginate?page=${page}&limit=${limit}`
  );
};
