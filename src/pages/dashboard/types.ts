export interface RevenueData {
  revenue: {
    totalSales: number;
    totalOrders: number;
    date?: string;  // Optional for daily revenue
    week?: string;  // Optional for weekly revenue
    year?: string;  // Optional for yearly revenue
  }[];
}
export interface DailyRevenue {
  date: Date;
  totalSales: number;
  totalOrders: number; // Trường này bắt buộc
  id: string;
}

export interface WeeklyRevenue {
  week: string;
  totalSales: number;
  totalOrders: number;
}

export interface YearlyRevenue {
  year: string;
  totalSales: number;
  totalOrders: number;
}

export interface TotalRevenue {
  totalSales: number;
  totalOrders: number;
}
