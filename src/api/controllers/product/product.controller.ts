import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import { PaginatedProductResponse, ProductGetParams, ProductRequest, ProductResponse } from './dto/product.type';
import { BaseController } from '../base.controller';
import { step } from '@src/common/core/step.decorator';

export class ProductController extends BaseController {
  private readonly BASE = '/products';

  @step()
  async getAll(params?: ProductGetParams): Promise<ApiParsedResponse<PaginatedProductResponse>> {
    return this.apiManager.get(
      this.BASE,
      params ? { params: params as Record<string, string | number | boolean> } : undefined,
    );
  }

  @step()
  async create(data: ProductRequest): Promise<ApiParsedResponse<ProductResponse>> {
    return this.apiManager.post(this.BASE, { data });
  }

  @step()
  async getById(productId: string): Promise<ApiParsedResponse<ProductResponse>> {
    return this.apiManager.get(`${this.BASE}/${productId}`);
  }

  @step()
  async update(productId: string, data: ProductRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${productId}`, { data });
  }

  @step()
  async remove(productId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${productId}`);
  }

  @step()
  async patch(productId: string, data: Partial<ProductRequest>): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.patch(`${this.BASE}/${productId}`, { data });
  }

  @step()
  async getRelated(productId: string): Promise<ApiParsedResponse<ProductResponse[]>> {
    return this.apiManager.get(`${this.BASE}/${productId}/related`);
  }

  @step()
  async search(q: string, page?: number): Promise<ApiParsedResponse<PaginatedProductResponse>> {
    return this.apiManager.get(`${this.BASE}/search`, {
      params: page !== undefined ? { q, page } : { q },
    });
  }
}
