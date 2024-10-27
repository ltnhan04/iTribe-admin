export interface Address {
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  mobile: string;
  status?: string;
  phoneNumber?: string; // Added for more clarity
  address?: Address; // Added for address details
  active?: boolean; // Added to indicate if the user is active
  orderHistory?: string[]; // Array of order IDs or references
}
