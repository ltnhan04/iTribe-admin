import type { GetProp, UploadProps } from "antd";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface DataType {
  key: React.Key;
  name: string;
  image: string;
  price: number;
  rating: number;
  status: string;
}
