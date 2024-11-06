import type { GetProp, UploadProps } from "antd";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  status: string;
}

export interface newProduct {
  name: string;
  description: string;
  slug: string;
}
