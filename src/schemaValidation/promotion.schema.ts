import { Rule } from "antd/lib/form";
import dayjs from "dayjs";

const getStartDate = () => {
  const startDate = localStorage.getItem("startDate");
  return startDate ? dayjs(startDate) : dayjs(); 
}

export const promotionNameRules: Rule[] = [
  { required: true, message: "Vui lòng nhập tên !" },
  { min: 3, message: "Tên không ít hơn 3 kí tự" },
  { max: 50, message: "Tên tối đa 50 kí tự" }, 
];

export const startDateRules: Rule[] = [
  { required: true, message: "Nhập ngày bắt đầu!" },
  {
    validator: (_, value) => {
      const currentDate = dayjs(); 
      if (!value || dayjs(value).isBefore(currentDate, 'day')) {
        return Promise.reject(new Error("Ngày bắt đầu phải lớn hơn ngày hôm nay !"));
      }
      return Promise.resolve();
    },
  },
];

export const endDateRules: Rule[] = [
  {
    required: true,
    message: "Nhập ngày kết thúc !",
  },
  {
    validator: (_, value) => {
      const startDate = getStartDate();
      if (!value) {
        return Promise.reject(new Error("Vui lòng chọn ngày kết thúc"));
      }
      const endDate = dayjs(value);
      
   
      if (!startDate.isValid()) {
        return Promise.reject(new Error("Ngày bắt đầu không hợp lệ"));
      }
      

      if (endDate.isBefore(startDate, 'day')) {
        return Promise.reject(new Error("Ngày kết thúc không thể trước ngày bắt đầu và không thể là ngày quá khứ"));
      }
      
      return Promise.resolve();
    },
  },
];

export const maxUsageRules: Rule[] = [
  { required: true, message: "Vui lòng nhập số lượng" },
  {
    type: "number",
    min: 1,
    max: 50,
    message: "Số lượng này sẽ không thể thay đổi",
    transform: (value) => Number(value), 
  },
  {
    validator: (_, value) => {
      if (value && (value < 1 || value > 50)) {
        return Promise.reject(new Error("Số lượng sử dụng phải từ 1 đến 50"));
      }
      return Promise.resolve();
    }
  }
]

export const discountRules: Rule[] = [
  { required: true, message: "Vui lòng nhập % giảm giá" },
  {
    type: "number",
    min: 5,
    max: 50,
    message: "Vui lòng kiểm tra lại % giảm giá",
    transform: (value) => Number(value), 
  },
  {
    validator: (_, value) => {
      if (value && (value < 5 || value > 50)) {
        return Promise.reject(new Error("Giảm giá phải nằm trong khoảng từ 5% đến 50%"));
      }
      return Promise.resolve();
    }
  }
];

