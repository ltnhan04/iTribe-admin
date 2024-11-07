//Product types
export interface Data {
  data: ProductList[];
}

export interface Root {
  message?: string;
  product: Product;
}
export type newProduct = Pick<Product, "name" | "description" | "slug">;

export interface ProductList {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  status: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string[];
  rating: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  status: string;
  variants: Variant[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Variant {
  color: Color;
  _id: string;
  productId: string;
  name: string;
  storage: string;
  price: number;
  stock: number;
  slug: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Color {
  colorName: string;
  colorCode: string;
}

//Product Variant types

//Get All Variants
export interface VariantRoot {
  variants: Variant[];
}

//Create Variant

export interface ProductVariantRoot {
  message: string;
  productVariant: ProductVariant;
}
export interface ProductVariant {
  productId: string;
  name: string;
  color: Color;
  storage: string;
  price: number;
  stock: number;
  slug: string;
  images: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
