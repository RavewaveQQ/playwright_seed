import type { BrandResponse } from '@controllers/brand/dto/brand.type';
import type { CategoryResponse } from '@controllers/category/dto/category.type';
import type { ImageResponse } from '@controllers/image/dto/image.type';
import type { Paginated } from '@src/types/common/api-response.type';

export interface ProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category_id?: string;
  brand_id?: string;
  product_image_id?: string;
  is_location_offer?: boolean;
  is_rental?: boolean;
  co2_rating?: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: boolean;
  is_rental: boolean;
  in_stock: boolean;
  co2_rating: string;
  is_eco_friendly: boolean;
  brand: BrandResponse;
  category: CategoryResponse;
  product_image: ImageResponse;
}

export type PaginatedProductResponse = Paginated<ProductResponse>;

export interface ProductGetParams {
  by_brand?: string;
  by_category?: string;
  is_rental?: string;
  between?: string;
  sort?: string;
  page?: number;
}
