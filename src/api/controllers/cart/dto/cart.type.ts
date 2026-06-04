export interface CartCreatedResponse {
  id: string;
}

export interface CartResponse {
  id: string;
}

export interface AddToCartRequest {
  product_id: string;
  quantity: number;
}

export interface CartItemAddedResponse {
  result: string;
}

export interface UpdateCartQuantityRequest {
  product_id: string;
  quantity: number;
}
