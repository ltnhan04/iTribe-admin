export interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  productVariants: {
    productVariant: string | ProductVariant;
    quantity: number;
    _id: string;
  }[];
  user?: string | User;
  shippingAddress: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  _id: string;
  name: string;
  price: number;
  storage: string;
  color?: {
    colorName?: string;
    colorCode?: string;
  };

  productStorage?: string;
  quantity: number;
  images?: string[];
}

export interface User {
  _id: string;
  name: string;
  mobile: string;
  role: string;
  email: string;
  active: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
