import type { Dayjs } from "dayjs";

export interface ProductVariant {
  id: number;
  product_id: number;
  storage: string;
  price: number;
  stock_quantity: number;
  slug: string;
  rating: number;
  color: string[];
  status: "in_stock" | "out_of_stock";
  images: string[];
}

export interface Promotion {
  id: number;
  code: string;
  discount_type: "amount" | "percentage";
  valid_from: string;
  valid_to: string;
  is_active: boolean;
  maxUsage: number;
  maxUsagePerUser: number;
  minOrderAmount: number;
  usedCount: number;
  applicable_category_id: number;
  applicable_variant_ids: number[];
  points: number;
}

export interface PromotionUserUsage {
  id: number;
  promotion_id: number;
  user_id: number;
  usage_count: number;
}

export interface PromotionProduct {
  id: number;
  promotion_id: number;
  product_variant_id: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface PromotionFormValues {
  code: string;
  discount_type: "amount" | "percentage";
  valid_from: Dayjs;
  valid_to: Dayjs;
  is_active: boolean;
  maxUsage: number;
  maxUsagePerUser: number;
  minOrderAmount: number;
  applicable_category_id: number;
  applicable_variant_ids: number[];
  points: number;
} 