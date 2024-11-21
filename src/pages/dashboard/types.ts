export interface OneDayType {
  message: string;
  revenue: Revenue;
}

export interface Revenue {
  date: string;
  totalSales: number;
  totalOrders: number;
  productVariants: ProductVariant[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductVariant {
  productVariant: string;
  name: string;
  totalSales: number;
  totalOrders: number;
  _id: string;
}

//Multi days
export interface MultiDaysType {
  message: string;
  totalSales: number;
  totalOrders: number;
  details: Detail[];
}

export interface Detail {
  productVariant: string;
  name: string;
  totalSales: number;
  totalOrders: number;
}
