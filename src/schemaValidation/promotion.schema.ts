import { Rule } from "antd/lib/form";
import dayjs from "dayjs";

export const promotionNameRules: Rule[] = [
  { required: true, message: "Please enter the promotion name" },
  { min: 3, message: "Promotion name must be at least 3 characters" },
];

export const descriptionRules: Rule[] = [
  { required: true, message: "Please enter the description" },
  { max: 200, message: "Description cannot exceed 200 characters" },
];

export const startDateRules: Rule[] = [
  { required: true, message: "Please select the start date" },
];

export const endDateRules: Rule[] = [
  {
    required: true,
    message: "Please select the end date",
  },
  {
    validator: (_, value) => {
      const startDate = dayjs(localStorage.getItem("startDate")); // Lưu trữ startDate trong localStorage hoặc state
      if (!value || !startDate || dayjs(value).isAfter(startDate)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("End date must be after start date"));
    },
  },
];

export const discountRules: Rule[] = [
  { required: true, message: "Please enter the discount percentage" },
  {
    type: "number",
    min: 0,
    max: 100,
    message: "Discount must be between 0 and 100",
  },
];
