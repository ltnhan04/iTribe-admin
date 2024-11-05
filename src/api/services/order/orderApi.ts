import { axiosInstance } from "../../../config/axiosInstance";

export const getOrders = async () => {
  return await axiosInstance.get(`/api/admin/orders`);
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return await axiosInstance.put(`/api/admin/orders/${orderId}`, { status });
};

export const deleteOrder = async (orderId: string) => {
  return await axiosInstance.delete(`/api/admin/orders/${orderId}`);
};

export const paginatedOrders = async () => {};
