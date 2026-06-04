import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import { CategoryRequest, CategoryResponse, CategoryTreeResponse } from './dto/category.type';
import { BaseController } from '../base.controller';

export class CategoryController extends BaseController {
  private readonly BASE = '/categories';

  async getTree(by_category_slug?: string): Promise<ApiParsedResponse<CategoryTreeResponse[]>> {
    return this.apiManager.get(
      `${this.BASE}/tree`,
      by_category_slug !== undefined ? { params: { by_category_slug } } : undefined,
    );
  }

  async getAll(): Promise<ApiParsedResponse<CategoryResponse[]>> {
    return this.apiManager.get(this.BASE);
  }

  async create(data: CategoryRequest): Promise<ApiParsedResponse<CategoryResponse>> {
    return this.apiManager.post(this.BASE, { data });
  }

  async getTreeById(categoryId: string): Promise<ApiParsedResponse<CategoryTreeResponse>> {
    return this.apiManager.get(`${this.BASE}/tree/${categoryId}`);
  }

  async search(q: string): Promise<ApiParsedResponse<CategoryResponse[]>> {
    return this.apiManager.get(`${this.BASE}/search`, { params: { q } });
  }

  async update(categoryId: string, data: CategoryRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${categoryId}`, { data });
  }

  async remove(categoryId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${categoryId}`);
  }

  async patch(categoryId: string, data: Partial<CategoryRequest>): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.patch(`${this.BASE}/${categoryId}`, { data });
  }
}
