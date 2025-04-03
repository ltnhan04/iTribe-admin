export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancel";
export type PaymentMethod = "stripe" | "momo" | "ship-cod";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ProductVariant {
  _id: string;
  name: string;
  storage: string;
  color: {
    colorName: string;
  };
  price: number;
  images: string[];
}

export interface OrderDetails {
  _id: string;
  order_id: string;
  product_variant_id: string;
  quantity: number;
  price: number;
  product_variant: ProductVariant;
}

export interface Order {
  _id: string;
  user_id: string;
  totalAmount: number;
  order_status: OrderStatus;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  stripeSessionId?: string;
  createdAt: string;
  user: User;
  order_details: OrderDetails[];
}

export interface OrderList {
  _id: string;
  user: User;
  variants: {
    _id: string;
    variant: ProductVariant;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
} 