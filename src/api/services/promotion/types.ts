export interface Promotions {
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validTo: Date;
  isActive?: boolean;
  maxUsage?: number;
}
