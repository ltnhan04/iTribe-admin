export interface Product {
  productId: string;
  productName: string;
  productColor: string;
  productStorage: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
}

export interface Order {
  orderId: string;
  user: User;
  products: Product[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
