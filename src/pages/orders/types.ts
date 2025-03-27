export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancel";
export type PaymentMethod = "stripe" | "momo" | "ship-cod";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  storage: string;
  color: string;
  price: number;
  images: string[];
}

export interface OrderDetails {
  id: number;
  order_id: number;
  product_variant_id: number;
  quantity: number;
  price: number;
  product_variant: ProductVariant;
}

export interface Order {
  id: number;
  user_id: number;
  totalAmount: number;
  order_status: OrderStatus;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  stripeSessionId?: string;
  created_at: string;
  user: User;
  order_details: OrderDetails[];
} 