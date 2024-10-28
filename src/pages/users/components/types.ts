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
export interface Order {
  totalAmount: number;
  status: string;
  products: string[]; // or a more specific type if needed
}
