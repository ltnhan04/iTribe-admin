export interface Product {
  productImages: any;
  productVariantId: string;
  productName: string;
  productColorName: string;
  productStorage: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
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
