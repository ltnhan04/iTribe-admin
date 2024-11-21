import { axiosInstance } from "../../../config/axiosInstance";

export const getAllNotification = async()=>{
    return await axiosInstance.get(`/api/admin/notifications`);
}