import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import { ProductSpecRequest, ProductSpecResponse, ProductSpecUpdateRequest } from './dto/product-spec.type';
import { BaseController } from '../base.controller';

export class ProductSpecController extends BaseController {
  private specBase(productId: string) {
    return `/products/${productId}/specs`;
  }

  async getAll(productId: string): Promise<ApiParsedResponse<ProductSpecResponse[]>> {
    return this.apiManager.get(this.specBase(productId));
  }

  async create(productId: string, data: ProductSpecRequest): Promise<ApiParsedResponse<ProductSpecResponse>> {
    return this.apiManager.post(this.specBase(productId), { data });
  }

  async getById(productId: string, specId: string): Promise<ApiParsedResponse<ProductSpecResponse>> {
    return this.apiManager.get(`${this.specBase(productId)}/${specId}`);
  }

  async update(
    productId: string,
    specId: string,
    data: ProductSpecUpdateRequest,
  ): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.specBase(productId)}/${specId}`, { data });
  }

  async remove(productId: string, specId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.specBase(productId)}/${specId}`);
  }

  async getSpecNames(): Promise<ApiParsedResponse<string[]>> {
    return this.apiManager.get('/product-specs/names');
  }
}
