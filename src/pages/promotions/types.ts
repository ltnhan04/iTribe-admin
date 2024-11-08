export interface FormValues {
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
}

export interface DataType {
  key: React.Key;
  _id: string; 
  code: string;
  discountPercentage: number; 
  validFrom: string; 
  validTo: string; 
  isActive: boolean; 
  status: string; 
}
