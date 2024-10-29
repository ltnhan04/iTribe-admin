import { axiosInstance } from "../../axiosInstance";

export const getOrders = async () => {
  return await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/admin/orders`
  );
};  

export const updateOrderStatus = async (orderId: string, status: string) => {
  return await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`,
    { status }
  );
};

export const deleteOrder = async (orderId: string) => {
  return await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`
  );
};

export const paginatedOrders = async () => {};
