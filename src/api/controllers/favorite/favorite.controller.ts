import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { FavoriteRequest, FavoriteResponse, FavoriteWithProductResponse } from './dto/favorite.type';
import { BaseController } from '../base.controller';

export class FavoriteController extends BaseController {
  private readonly BASE = '/favorites';

  async getAll(): Promise<ApiParsedResponse<FavoriteWithProductResponse[]>> {
    return this.apiManager.get(this.BASE);
  }

  async create(data: FavoriteRequest): Promise<ApiParsedResponse<FavoriteResponse>> {
    return this.apiManager.post(this.BASE, { data });
  }

  async getById(favoriteId: string): Promise<ApiParsedResponse<FavoriteResponse>> {
    return this.apiManager.get(`${this.BASE}/${favoriteId}`);
  }

  async remove(favoriteId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${favoriteId}`);
  }
}
