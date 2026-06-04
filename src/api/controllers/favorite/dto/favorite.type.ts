import type { ProductResponse } from '@controllers/product/dto/product.type';

export interface FavoriteRequest {
  product_id: string;
}

export interface FavoriteResponse {
  id: string;
  product_id: string;
  user_id: string;
}

export interface FavoriteWithProductResponse extends FavoriteResponse {
  product: ProductResponse;
}
