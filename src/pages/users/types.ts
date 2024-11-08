export interface User {
  _id: number;
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
}

export interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  products: {
    product: {
      _id: string;  // Product ID
      name: string; // Product name
    };
    quantity: number;
    _id: string;  // Unique identifier for this order item
  }[];
}
