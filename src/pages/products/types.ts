export interface Review {
  id: number;
  user_id: number;
  product_variant_id: number;
  rating: number;
  comment: string;
}

export interface ProductVariant {
  _id: string;
  product_id: string;
  storage: string;
  price: number;
  stock_quantity: number;
  slug: string;
  rating: number;
  color: {
    colorName: string;
    colorCode: string;
  };
  status: "in_stock" | "out_of_stock";
  images: string[];
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface VariantFilters {
  storage: string;
  price: number | null;
  stock: number | null;
  status: "in_stock" | "out_of_stock" | null;
}

export interface User {
  id: number;
  name: string;
} 