import { RuleObject } from 'antd/lib/form';
import dayjs from 'dayjs';

export const promotionNameRules = [
  { required: true, message: 'Please enter the promotion name' },
  { min: 3, message: 'Promotion name must be at least 3 characters' },
];

export const descriptionRules = [
  { required: true, message: 'Please enter the description' },
  { max: 200, message: 'Description cannot exceed 200 characters' },
];

export const startDateRules = [{ required: true, message: 'Please select the start date' }];

export const endDateRules = (getFieldValue: (field: string) => string | undefined): RuleObject => ({
  required: true,
  message: 'Please select the end date',
  validator(_: RuleObject, value: string) {
    const startDate = getFieldValue('startDate');
    if (!value || !startDate || dayjs(value).isAfter(dayjs(startDate))) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('End date must be after start date'));
  },
});

export const discountRules = [
  { required: true, message: 'Please enter the discount percentage' },
  { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' },
];
