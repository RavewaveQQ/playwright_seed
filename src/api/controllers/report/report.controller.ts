import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import {
  AverageSalesPerMonthResponse,
  AverageSalesPerWeekResponse,
  CustomersByCountryResponse,
  TopPurchasedProductResponse,
  TopSellingCategoryResponse,
  TotalSalesOfYearResponse,
  TotalSalesPerCountryResponse,
} from './dto/report.type';
import { BaseController } from '../base.controller';

export class ReportController extends BaseController {
  private readonly BASE = '/reports';

  async getTotalSalesPerCountry(): Promise<ApiParsedResponse<TotalSalesPerCountryResponse[]>> {
    return this.apiManager.get(`${this.BASE}/total-sales-per-country`);
  }

  async getTopPurchasedProducts(): Promise<ApiParsedResponse<TopPurchasedProductResponse[]>> {
    return this.apiManager.get(`${this.BASE}/top10-purchased-products`);
  }

  async getBestSellingCategories(): Promise<ApiParsedResponse<TopSellingCategoryResponse[]>> {
    return this.apiManager.get(`${this.BASE}/top10-best-selling-categories`);
  }

  async getTotalSalesOfYears(years?: number): Promise<ApiParsedResponse<TotalSalesOfYearResponse[]>> {
    return this.apiManager.get(
      `${this.BASE}/total-sales-of-years`,
      years !== undefined ? { params: { years } } : undefined,
    );
  }

  async getAverageSalesPerMonth(year?: number): Promise<ApiParsedResponse<AverageSalesPerMonthResponse[]>> {
    return this.apiManager.get(
      `${this.BASE}/average-sales-per-month`,
      year !== undefined ? { params: { year } } : undefined,
    );
  }

  async getAverageSalesPerWeek(year?: number): Promise<ApiParsedResponse<AverageSalesPerWeekResponse[]>> {
    return this.apiManager.get(
      `${this.BASE}/average-sales-per-week`,
      year !== undefined ? { params: { year } } : undefined,
    );
  }

  async getCustomersByCountry(): Promise<ApiParsedResponse<CustomersByCountryResponse[]>> {
    return this.apiManager.get(`${this.BASE}/customers-by-country`);
  }
}
