// User Interface
export interface User {
  _id: string;  // Changed to string to match typical MongoDB ObjectId type
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

// ProductVariant Interface
export interface ProductVariant {
  _id: string;    // Product variant ID
  name: string;   // Name of the product variant
  price: number;  // Price of the product variant
  stock: number;  // Quantity of the product variant in stock
}

// Order Interface
export interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  productVariants: {
    productVariant: string;  // This is the ID of the product variant
    quantity: number;
    _id: string;  // Unique identifier for this order item
  }[];
}
