export interface Product {
  productVariantId: string;
  productName: string;
  productColorName: string;
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
  productVariants: Product[];
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
