// types.ts
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
// types.ts
// export interface Product {
//   product: {
//     _id: string;
//     name: string;
//   };
//   quantity: number;
// }

// export interface Order {
//   _id: string;
//   totalAmount: number;
//   status: string;
//   products: Product[];
// }

export interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  products: {
    product: string; // or a specific type if it's an object
    quantity: number;
    _id: string;
  }[];
}
