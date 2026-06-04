import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import { BrandRequest, BrandResponse } from './dto/brand.type';
import { BaseController } from '../base.controller';

export class BrandController extends BaseController {
  private readonly BASE = '/brands';

  async getAll(): Promise<ApiParsedResponse<BrandResponse[]>> {
    return this.apiManager.get(this.BASE);
  }

  async create(data: BrandRequest): Promise<ApiParsedResponse<BrandResponse>> {
    return this.apiManager.post(this.BASE, { data });
  }

  async getById(brandId: string): Promise<ApiParsedResponse<BrandResponse>> {
    return this.apiManager.get(`${this.BASE}/${brandId}`);
  }

  async update(brandId: string, data: BrandRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${brandId}`, { data });
  }

  async remove(brandId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${brandId}`);
  }

  async patch(brandId: string, data: Partial<BrandRequest>): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.patch(`${this.BASE}/${brandId}`, { data });
  }

  async search(q: string): Promise<ApiParsedResponse<BrandResponse[]>> {
    return this.apiManager.get(`${this.BASE}/search`, { params: { q } });
  }
}
