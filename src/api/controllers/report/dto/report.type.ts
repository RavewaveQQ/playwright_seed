export interface TotalSalesPerCountryResponse {
  billing_country: string;
  total_sales: string;
}

export interface TopPurchasedProductResponse {
  name: string;
  count: number;
}

export interface TopSellingCategoryResponse {
  category_name: string;
  total_earned: string;
}

export interface TotalSalesOfYearResponse {
  year: number;
  total: number;
}

export interface AverageSalesPerMonthResponse {
  month: number;
  average: number;
  amount: number;
}

export interface AverageSalesPerWeekResponse {
  week: number;
  average: number;
  amount: number;
}

export interface CustomersByCountryResponse {
  amount: number;
  country: string;
}
