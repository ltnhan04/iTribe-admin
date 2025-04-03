export interface IResponseCustomer {
  message: string;
  data: Customer[];
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
