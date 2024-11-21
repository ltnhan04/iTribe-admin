import { axiosInstance } from "../../../config/axiosInstance";
import { AxiosError } from "axios";

// Xử lý lỗi chung cho các API
const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || "API error occurred");
  } else if (error instanceof Error) {
    throw new Error(error.message || "Error occurred");
  } else {
    throw new Error("An unknown error occurred.");
  }
};

export const getMessages = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/chat/messages/`
    );
    return Array.isArray(response.data.messages) ? response.data.messages : [];
  } catch (error) {
    handleApiError(error);
    return []; 
  }
};

// Gửi phản hồi từ admin và lưu tin nhắn vào DB
export const sendAdminReply = async (userId: string, message: string) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/chat/admin/reply`,
        { userId, message,sender: 'admin' }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };
