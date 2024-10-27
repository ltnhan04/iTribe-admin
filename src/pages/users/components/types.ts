// types.ts
export interface User {
  id: number;
  name: string;
  mobile: string;
  role: string;
  email: string;
  status: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}
