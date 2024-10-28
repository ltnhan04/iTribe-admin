export interface DailyRevenue {
  date: Date; 
  totalSales: number;
}

export interface WeeklyRevenue {
  week: number;
  totalSales: number;
}

export interface YearlyRevenue {
  year: number;
  totalSales: number;
}

export interface TotalRevenue {
  totalSales: number;
  totalOrders: number;
}
