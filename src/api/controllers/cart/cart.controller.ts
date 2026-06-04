import { ApiParsedResponse } from '@src/types/common/api-manager.type';
import { UpdateResponse } from '@src/types/common/api-response.type';
import {
  AddToCartRequest,
  CartCreatedResponse,
  CartItemAddedResponse,
  CartResponse,
  UpdateCartQuantityRequest,
} from './dto/cart.type';
import { BaseController } from '../base.controller';

export class CartController extends BaseController {
  private readonly BASE = '/carts';

  async create(): Promise<ApiParsedResponse<CartCreatedResponse>> {
    return this.apiManager.post(this.BASE);
  }

  async addItem(cartId: string, data: AddToCartRequest): Promise<ApiParsedResponse<CartItemAddedResponse>> {
    return this.apiManager.post(`${this.BASE}/${cartId}`, { data });
  }

  async getById(cartId: string): Promise<ApiParsedResponse<CartResponse>> {
    return this.apiManager.get(`${this.BASE}/${cartId}`);
  }

  async remove(cartId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${cartId}`);
  }

  async updateQuantity(cartId: string, data: UpdateCartQuantityRequest): Promise<ApiParsedResponse<UpdateResponse>> {
    return this.apiManager.put(`${this.BASE}/${cartId}/product/quantity`, { data });
  }

  async removeProduct(cartId: string, productId: string): Promise<ApiParsedResponse<void>> {
    return this.apiManager.delete(`${this.BASE}/${cartId}/product/${productId}`);
  }
}
