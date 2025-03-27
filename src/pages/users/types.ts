export type UserRole = "customer" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRole;
  created_at: string;
  orders: Order[];
  reviews: Review[];
}

export interface Review {
  id: number;
  user_id: number;
  product_variant_id: number;
  rating: number;
  comment: string;
  created_at: string;
  product_variant: {
    id: number;
    name: string;
    storage: string;
    color: string;
    price: number;
    images: string[];
  };
}

export interface Order {
  id: number;
  user_id: number;
  totalAmount: number;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancel";
  shippingAddress: string;
  paymentMethod: "stripe" | "momo" | "ship-cod";
  stripeSessionId?: string;
  created_at: string;
  order_details: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_variant_id: number;
  quantity: number;
  price: number;
  product_variant: {
    id: number;
    name: string;
    storage: string;
    color: string;
    price: number;
    images: string[];
  };
} 